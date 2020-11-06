import { Injectable } from '@nestjs/common';
import { Course } from '@planisto/university'
import { Connection } from 'typeorm';
// import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

@Injectable()
// export class CoursesService extends TypeOrmCrudService<Course> {}
export class CoursesService {
    constructor(private connection: Connection) {}

    async getAll(): Promise<Course[]> {
        return this.connection.getRepository<Course>(Course).find()
    }
}
