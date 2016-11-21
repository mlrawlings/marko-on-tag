var parse = require('./parse');

module.exports = function(el, context) {
    if(!el.argument) {
        throw new Error('<on> tag must be passed an argument');
    }
    var builder = context.builder;
    var result = parse(el.argument);

    el.argument = null;

    el.setAttributeValue('_stream', builder.parseExpression(result.stream));
    el.setAttributeValue('_varName', builder.literal(result.varName));

    if(result.dataEvent){
        el.setAttributeValue('_dataEvent', builder.parseExpression(result.dataEvent));
    }
    if(result.endEvent){
        el.setAttributeValue('_endEvent', builder.parseExpression(result.endEvent));
    }
}