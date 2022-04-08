import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params, next) => {
      if (params.action === 'delete') {
        params.action = 'update';
        params.args['data'] = { deleted: new Date() };
      }
      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
          params.args.data['deleted'] = new Date();
        } else {
          params.args['data'] = { deleted: new Date() };
        }
      }

      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        params.args.where['deleted'] = null;
      }
      if (params.action === 'findMany') {
        if (params.args.where) {
          if (params.args.where.deleted == null) {
            params.args.where['deleted'] = null;
          }
        } else {
          params.args['where'] = { deleted: null };
        }
      }
      return next(params);
    });
  }
}
