import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Offer } from '@planisto/university';
import { ApiTags } from '@nestjs/swagger';

@Crud({
	model: { type: Offer }
})
@ApiTags('Offers')
@Controller('offer')
export class OffersController {}
