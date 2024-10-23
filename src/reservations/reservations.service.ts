import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Tables, TablesDocument } from '../tables/schemas/table.schema';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../clients/schemas/client.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Tables.name)
    private tableModel: Model<TablesDocument>,
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const { client_id, table_id } = createReservationDto;
    const clients = await this.clientModel.findById(client_id);
    if (!clients) {
      throw new BadRequestException('No such reservation');
    }
    const tables = await this.tableModel.findById(table_id);
    if (!tables) {
      throw new BadRequestException('No such reservation');
    }
    const newReservation =
      await this.reservationModel.create(createReservationDto);
    clients.reservations.push(newReservation),
      tables.reservations.push(newReservation);
    await clients.save();
    await tables.save();
    return newReservation;
  }

  findAll() {
    return this.reservationModel
      .find()
      .populate('client_id')
      .populate('table_id');
  }

  findOne(id: string) {
    return this.reservationModel.findById(id);
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationModel.findByIdAndUpdate(id, this.reservationModel, {
      new: true,
    });
  }

  remove(id: string) {
    return this.reservationModel.findByIdAndDelete(id);
  }
}
