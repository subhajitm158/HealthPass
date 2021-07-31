var method = TopicRepository.prototype;

var instance;

function TopicRepository() {
    if (instance) {
        return instance;
    }
    this.instance = {}
}

method.getTopic = function (topic) {
    return this.instance[topic];
}

method.addTopic = function (topic) {
    this.instance[topic] = "progress";
    return this.instance[topic];
}

method.validateTopic = function (topic) {
    this.instance[topic] = "completed";
    return this.instance[topic];
}

method.deleteTopic = function (topic) {
    return delete this.instance[topic];
}

method.existsTopic = function (topic) {
    return topic in this.instance;
}

method.addCustomTopic = function (topic, value) {
    this.instance[topic] = value;
    return this.instance[topic];
}

module.exports = TopicRepository;