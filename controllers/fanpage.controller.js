const http = require('http');
const path = require('path');
const status = require('http-status');

let _fanpage;
//Insertar
const createFanPage = (req,res)=>{
    const fanpage= req.body;

    _fanpage.create(fanpage)
    .then((data)=>{
        res.status(status.OK);
        res.json({msg:"FanPage registrada",data:data});
    })
    .catch((err)=>{
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error al crear!",data:err});
    });
}
//Comentar
const addComents= (req,res) =>{
    const{id} = req.params;
    
    _fanpage.update({_id:id},{$push:req.body})
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Comentario insertado",data:data});
        })
        .catch((err)=>{
            res.status({msg:"Error",data:err});
        });
}
//Consulta comentarios
const findComents = (req,res)=>{
    const {id} = req.params;
    _fanpage.findOne({_id:id},{description:false,keywords:false,calif:false})
        .then((data)=>{
            if(data.length == 0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No existe fan fage"});
            }else{
                res.status(status.OK);
                res.json({msg:"Exito",data:data});
            }
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        })
}

function calcularCalificacion(id){
    
    return calif[1];
}
//Calificacion global
const califGlobal = (req,res)=>{
    const {id} = req.params;
    //const calif = _fanpage.findOne({_id:id},{description:false,keywords:false,_id:false,coments:false,title:false});
    
    //$ avg
    //var cal = calcularCalificacion(id);
    _fanpage.findOne({_id:id})
        .then((data)=>{
            
                res.status(status.OK);
                let suma = data.calif.reduce((ac,sg)=>ac+sg);
                let promedio= suma /data.calif.length;
                
                res.json({msg:"Calificaciones",promedio:promedio});
            
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        })
}



module.exports = (Fanpage)=>{
    _fanpage= Fanpage;
    return({
        createFanPage,
        addComents,
        findComents,
        califGlobal
    });
}