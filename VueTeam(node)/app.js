var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var morgan=require('morgan');

var MongoClient=require('mongodb').MongoClient;
var mongoUrl='mongodb://localhost:27017/team';
var _db;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));

MongoClient.connect(mongoUrl, function(err,db){
   if(err){
       console.log(err);
       return;
   }
   console.log('connected to mongo');
   _db=db;
   app.listen(8888, function () {
    console.log('server is running...');
   });
});

/******数据库中的表********/


/*****create insert*********/
function insert(table,req,res){
	table.insert(req.body,function(err,data){
        if(err) {console.log(err); res.status(500).end()}
        else{
        	res.send(null);
        }
   });
}

app.post('/create',function(req,res){
	var neibu=_db.collection('neibuObj');
    var shanghu=_db.collection('shanghuObj');
    var qudao=_db.collection('qudaoObj');

   if(req.body.objClass=='内部项目'){
      insert(neibu,req,res);
   }
   else if(req.body.objClass=='商户接入'){
      insert(shanghu,req,res);
   } 
   else if(req.body.objClass=='渠道接入'){
      insert(qudao,req,res);
   }  
});

/*****接addChild*******/
app.post('/add',function(req,res){
    var neibu=_db.collection('neibuObj');
    var shanghu=_db.collection('shanghuObj');
    var qudao=_db.collection('qudaoObj');

    if(req.body.who.className=='内部项目'){
    	var arr=neibu.find({'objTime':req.body.who.time});
    	arr.toArray(function(err,data){
    		var array=data[0].objChilds.push(req.body);
            neibu.update({ "objTime" : req.body.who.time },{"$set":{"objChilds" : data[0].objChilds}});
            res.send(null);
    	}); 
    }
    else if(req.body.who.className=='商户接入') {
        var arr=shanghu.find({'objTime':req.body.who.time});
    	arr.toArray(function(err,data){
    		var array=data[0].objChilds.push(req.body);
            shanghu.update({ "objTime" : req.body.who.time },{"$set":{"objChilds" : data[0].objChilds}});
            res.send(null);
    	});
    }
    else if(req.body.who.className=='渠道接入') {
         var arr=qudao.find({'objTime':req.body.who.time});
    	 arr.toArray(function(err,data){
    		var array=data[0].objChilds.push(req.body);
            qudao.update({ "objTime" : req.body.who.time },{"$set":{"objChilds" : data[0].objChilds}});
            res.send(null);
    	});
    }
});

/****接updateChild********/
app.post('/update',function(req,res){
    var neibu=_db.collection('neibuObj');
    var shanghu=_db.collection('shanghuObj');
    var qudao=_db.collection('qudaoObj');
 
    if(req.body.who.className=='内部项目'){
    	var arr=neibu.find({'objTime':req.body.who.time});
    	arr.toArray(function(err,data){
    		data[0].objChilds[req.body.who.childIndex]=req.body;
    		neibu.update({ "objTime" : req.body.who.time },{"$set":{"objChilds" : data[0].objChilds}});
            res.send(null);
    	}); 
    }
    else if(req.body.who.className=='商户接入'){
    	var arr=shanghu.find({'objTime':req.body.who.time});
    	arr.toArray(function(err,data){
    		data[0].objChilds[req.body.who.childIndex]=req.body;
    		shanghu.update({ "objTime" : req.body.who.time },{"$set":{"objChilds" : data[0].objChilds}});
            res.send(null);
    	}); 
    }
    else if(req.body.who.className=='渠道接入'){
    	var arr=qudao.find({'objTime':req.body.who.time});
    	arr.toArray(function(err,data){
    		data[0].objChilds[req.body.who.childIndex]=req.body;
    		qudao.update({ "objTime" : req.body.who.time },{"$set":{"objChilds" : data[0].objChilds}});
            res.send(null);
    	}); 
    }

});

/*****接删除OBJ***********/
app.post('/del',function(req,res){
    var neibu=_db.collection('neibuObj');
    var shanghu=_db.collection('shanghuObj');
    var qudao=_db.collection('qudaoObj');

    if(req.body.className=='内部项目'){
    	neibu.remove({"objTime": req.body.time});
    	res.send(null);
    }
    else if(req.body.className=='商户接入'){
    	shanghu.remove({"objTime": req.body.time});
    	res.send(null);
    }
    else if(req.body.className=='渠道接入'){
    	qudao.remove({"objTime": req.body.time});
    	res.send(null);
    }        
});

/*****页面数据初始化******/
app.get('/loadNeibu',function(req,res){
   var neibu=_db.collection('neibuObj');
   var neibuArr=neibu.find();
   neibuArr.toArray(function(err,data){
      res.send(data);
   });
});

app.get('/loadShanghu',function(req,res){
   var shanghu=_db.collection('shanghuObj');
   var shanghuArr=shanghu.find();
   shanghuArr.toArray(function(err,data){
      res.send(data);
   });
});

app.get('/loadQudao',function(req,res){
   var qudao=_db.collection('qudaoObj');
   var qudaoArr=qudao.find();
   qudaoArr.toArray(function(err,data){
      res.send(data);
   });
});

