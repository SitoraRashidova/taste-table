import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(client: ClientDocument) {
    const payload = {
      id: client._id,
      is_active: client.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  async create(createClientDto: CreateClientDto) {
    const { password, confirm_password } = createClientDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Password is not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newClient = await this.clientModel.create({
      ...CreateClientDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(newClient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    newClient.hashed_refresh_token = hashed_refresh_token;
    await newClient.save();
    return {
      message: 'Client is added',
      access_token: tokens.access_token,
      id: newClient._id,
    };
  }

  findAll() {
    return this.clientModel.find().populate('reservations');
  }

  findOne(id: string) {
    return this.clientModel.findById(id);
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
  findByEmail(email: string) {
    return this.clientModel.findOne({ email: email });
  }
  findById(id: string) {
    return this.clientModel.findById(id);
  }
}
