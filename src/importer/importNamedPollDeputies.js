import { Scraper } from '@democracy-deutschland/scapacra';
import { NamedPollDeputyScraperConfiguration } from '@democracy-deutschland/scapacra-bt';

import NamedPoll from '../models/NamedPoll';

export default async () => {
  Log.info('START NAMED POLL DEPUTIES SCRAPER');
  try {
    await Scraper.scrape([new NamedPollDeputyScraperConfiguration()], dataPackages => {
      dataPackages.map(async dataPackage => {
        // Construct Database object
        const namedPollWebId = dataPackage.data.id;
        // Add webId field, Remove id field
        const deputies = dataPackage.data.votes.deputies.map(deputy => {
          const dep = deputy;
          dep.webId = dep.id;
          delete dep.id;
          return dep;
        });

        // Update/Insert
        await NamedPoll.updateOne(
          { webId: namedPollWebId },
          { $set: { 'votes.deputies': deputies } },
        );

        return null;
      });
    });
  } catch (error) {
    Log.error(`Named Poll Deputies Scraper failed ${error.message}`);
  }
  Log.info('FINISH NAMED POLL DEPUTIES SCRAPER');
};
