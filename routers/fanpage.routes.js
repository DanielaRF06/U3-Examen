const  router = require('express').Router(); 

module.exports = (wagner) => {

        const fanpageCtrl = wagner.invoke((Fanpage) => 
                                require('../controllers/fanpage.controller')(Fanpage));

        router.post('/',(req,res)=>{  
                fanpageCtrl.createFanPage(req,res); 
        });
        router.put('/:id',(req,res)=>{  
            fanpageCtrl.addComents(req,res); 
        });
        router.get('/:id',(req,res)=>{  
        fanpageCtrl.findComents(req,res); 
        });
        router.get('/calificacion/:id',(req,res)=>{  
            fanpageCtrl.califGlobal(req,res); 
            });
       
       
        return router;
}
    