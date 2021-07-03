import { Resolvers } from './types';

const DeputyResolvers: Resolvers = {
  Query: {
    deputy: async (parent, { webId }, { DeputyModel }) => DeputyModel.findOne({ webId }),

    deputies: async (parent, { limit = 99, offset = 0 }, { DeputyModel }) =>
      DeputyModel.find({}, {}, { sort: { createdAt: 1 }, skip: offset, limit }),

    deputyUpdates: async (
      parent,
      { since, limit = 99, offset = 0 },
      { DeputyModel, HistoryModel },
    ) => {
      const beforeCount = await DeputyModel.count({ createdAt: { $lte: since } });
      const afterCount = await DeputyModel.count({});
      const deputies = await DeputyModel.find(
        {},
        {},
        { sort: { createdAt: 1 }, skip: offset, limit },
      );
      console.log('deputies.length', deputies.length);
      return {
        beforeCount,
        afterCount,
        newCount: afterCount - beforeCount,
        changedCount: 0,
        deputies,
      };
    },
  },
};

export default DeputyResolvers;
