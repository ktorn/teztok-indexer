import keyBy from 'lodash/keyBy';
import eventProcessorTask from './event-processor/event-processor';
import eventProducerTask from './event-producer/event-producer';
import fetchMetadataTask from './fetch-metadata/fetch-metadata';
import processArtifactTask from './process-artifact/process-artifact';
import rebuildTokenTask from './rebuild-token/rebuild-token';

export const tasks = [eventProcessorTask, eventProducerTask, fetchMetadataTask, processArtifactTask, rebuildTokenTask];

export const tasksByName = keyBy(tasks, 'name');
