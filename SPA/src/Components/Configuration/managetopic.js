import TopicRepository from '../Configuration/topic';
const repository = new TopicRepository();

let topicStored = '';

export async function setTopic(topic) {
	topicStored = topic;
}

export async function getTopic() {
	return repository.getTopic(topicStored);
}

export async function addTopic() {
	repository.addTopic(topicStored);
	return 'Added';
}

export async function validateTopic(topic) {
	if (topic === topicStored) {
		repository.validateTopic(topicStored);
		return 'Validated';
	} else {
		return 'Not Validated';
	}
}
