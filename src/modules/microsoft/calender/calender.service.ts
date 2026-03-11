import { Injectable } from '@nestjs/common';
import { GraphService } from '../services/graph.service';

@Injectable()
export class CalenderService {
  constructor(private readonly graphService: GraphService) {}
}
