const mongoose = require('mongoose');

let fanpageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    keywords:[{
        type:Array,
        required:true
    }],
    coments:[{
        type:Array
    }],
    calif:[{
        type:Number
    }]
});

const fanpageModel = mongoose.model('Fanpage', fanpageSchema, 'fanpage');

module.exports = fanpageModel;