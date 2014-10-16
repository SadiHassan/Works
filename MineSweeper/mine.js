
    	var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
	    
		var flag=[];
		var board=[];
		var explored=[];
		
		var FLAG_EXISTS = 1;
		var NO_FLAG = 0;
		var MINE = -1;
		var NO_MINE = 0;
		var total_mine = 0;
		var MAX_MINE = 50;
		var x, y;
		
		for(var i=0; i<20; i++){
			flag[i] = [];
			for(var j=0; j<20; j++)
				flag[i][j]=NO_FLAG;
		}
		
		for(var i=0; i<20; i++){
			board[i] = [];
			explored[i] = [];
			for(var j=0; j<20; j++){
				board[i][j]=NO_MINE;
				explored[i][j] = false;
			}
		}
		
		while(total_mine<=MAX_MINE){
			x = Math.floor( Math.random()*19 );
			y = Math.floor( Math.random()*19 );
			//console.log(x+" "+y);
			if(board[y][x]==NO_MINE){
					board[y][x]=MINE;
					//console.log("MINE : "+y+" "+x);
					total_mine++;
				}
		}
		
		for(var i=0; i<20; i++){
			for(var j=0; j<20; j++){
				if(board[i][j]==MINE) continue;
				if(i-1>=0){
					if(board[i-1][j]==MINE) board[i][j]+=1;
				}
				if(i+1<20){
					if(board[i+1][j]==MINE) board[i][j]+=1;
				}
				if(j-1>=0){
					if(board[i][j-1]==MINE) board[i][j]+=1;
				}
				if(j+1<20){
					if(board[i][j+1]==MINE) board[i][j]+=1;
				}
				if(i-1>=0&&j-1>=0){
					if(board[i-1][j-1]==MINE) board[i][j]+=1;
				}
				if(i-1>=0&&j+1<20){
					if(board[i-1][j+1]==MINE) board[i][j]+=1;
				}
				if(i+1<20&&j-1>=0){
					if(board[i+1][j-1]==MINE) board[i][j]+=1;
				}
				if(i+1<20&&j+1<20){
					if(board[i+1][j+1]==MINE) board[i][j]+=1;
				}
				
			}
		}
       
	    function add_flag(col,row){
				//alert("add flag: "+row+" "+col);
				ctx.save();
                			
				ctx.fillStyle="#D1140E";
				ctx.beginPath();
				ctx.moveTo( col*25+20 , row*25+7 );
				ctx.lineTo(col*25+20 - 10 ,row*25+7 + 10);
				ctx.lineTo(col*25+20, row*25+7 + 10);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
				
				ctx.beginPath();
                ctx.fillStyle = '#000000';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = this.strokewidth;
                ctx.rect(col*25+20, row*25+7, 1, 15);
				ctx.stroke();
                ctx.fill();
                ctx.restore();
		}
		
		function remove_flag(col,row){
			//alert("remove flag: "+row+" "+col);
			for (var i = 0; i < rects.length; i++) {
				if(rects[i].id==row*20+col){
					rects[i].redraw();
				}
			}
		}
	   
        var rect = (function () {

            // constructor
            function rect(id, x, y, width, height, fill, stroke, strokewidth) {
                this.x = x;
                this.y = y;
                this.id = id;
                this.width = width;
                this.height = height;
				
			   	//var grd = ctx.createLinearGradient(x, y, 200, 200);
                //grd.addColorStop(0, '#8ED6FF');   
     			//grd.addColorStop(1, '#004CB3');
				//this.fill = grd;
				
				this.fill = fill || "gray";
				
				
                this.stroke = stroke || "skyblue";
				//this.stroke = stroke;
                this.strokewidth = strokewidth || 2;
				this.strokewidth = strokewidth;
                this.redraw(this.x, this.y);
                return (this);
            }
            rect.prototype.redraw = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                this.draw(this.stroke);
                return (this);
            }
            //
            rect.prototype.highlight = function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
                
				ctx.save();
                ctx.beginPath();
				ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = '#ccccff';
				ctx.fill();
                ctx.strokeStyle = '#336699';
                ctx.lineWidth = this.strokewidth;
				
				ctx.stroke();
                
                return (this);
            }
            //
            rect.prototype.draw = function (stroke) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = this.fill;
                ctx.strokeStyle = stroke;
                ctx.lineWidth = this.strokewidth;
                
				/*
				ctx.shadowColor = 'gray';
				ctx.shadowBlur = 25;
				ctx.shadowOffsetX = 10;
				ctx.shadowOffsetY = 10;
				*/
				ctx.rect(this.x, this.y, this.width, this.height);
				
				var row = get_row(this.id);
				var col = get_col(this.id);
				//if(board[col][row]==MINE){
					//console.log(col+" "+row);
					
				//}
				
				ctx.stroke();
                ctx.fill();
                ctx.restore();
				
				/*
				ctx.beginPath();
				
				if(board[col][row]==MINE){
						ctx.fillStyle = "Red";
						ctx.fillText("M", col*25+10, row*25+18);
					}
				
				else 	{
							ctx.fillStyle = "Blue";
							ctx.fillText(""+board[col][row], col*25+10, row*25+18);
						}
				ctx.font = "bold 12px sans-serif";
				ctx.fill();
				*/
				
				
				if(explored[col][row]){
					ctx.save();
					ctx.beginPath();
					ctx.fillStyle = "Blue";
					ctx.font = "bold 12px sans-serif";
					ctx.fillText(""+board[col][row], col*25+10, row*25+18);
					ctx.fill();
					ctx.restore();
				}
				
				}
				
            
            rect.prototype.isPointInside = function (x, y) {
                return (x >= this.x && x <= this.x + this.width + 5 && y >= this.y && y <= this.y + this.height + 5);
            }


            return rect;
        })();


        function get_row(val){ return Math.floor(val/20); }
		function get_col(val){ return val%20;}
		
        function handleMouseDown(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);
			
			
            var clicked="";
            for (var i = 0; i < rects.length; i++) {
                if (rects[i].isPointInside(mouseX, mouseY)) {
                    clicked = rects[i].id;
					break;
                }
            }
           
			
			var row = get_row( clicked );
			var col = get_col( clicked );
			
			//Right Mouse click---> Add Flag or Remove Flag
			if(e.which==3){
				if(flag[col][row]==NO_FLAG && !explored[col][row]){
					flag[col][row]=FLAG_EXISTS;
					add_flag(col,row);
				}
				else {
						flag[col][row]=NO_FLAG;
						remove_flag(col,row);
				
				}
			}
			
			if(e.which==1){
				//alert("Left");
				if(flag[col][row]==NO_FLAG && !explored[col][row]){
					explored[col][row] = true;
					rects[row*20+col].redraw();
				}
			}
        }

        //
        function handleMouseMove(e) {
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);
			
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < rects.length; i++) {
				var row = get_row(rects[i].id);
				var col = get_col(rects[i].id);
					
                if (rects[i].isPointInside(mouseX, mouseY)) {
                    if(flag[col][row]==NO_FLAG)
					rects[i].highlight();
					
                } else {
					if(flag[col][row]==NO_FLAG)
                    rects[i].redraw();
					if(flag[col][row]==FLAG_EXISTS) add_flag(col,row);
					
                }
					
					
			
			}
        }


        //
        var rects = [];
        //
        //rects.push(new rect("Red-Rectangle", 15, 35, 65, 60, "red", "black", 10));
        //rects.push(new rect("Green-Rectangle", 60, 80, 70, 50, "green", "black", 10));
        //rects.push(new rect("Blue-Rectangle", 125, 25, 25, 25, "blue", "black", 10));
		var rect_id=0;
		for(var i=5;i<500;i+=25){
			for(var j=5; j<500; j+=25){
				rects.push(new rect(rect_id++, j, i, 20, 20, "#CCB7B3", "white", 2)); //ccccff
			}
		}
		
        //
        var canvas = $('#canvas'); 
		//$('#canvas').click(handleMouseDown);
        //$('#canvas').mousemove(handleMouseMove);
		canvas.on({
					mouseup: function(e){
					handleMouseDown(e);
					//action.click(e);
					//console.log(e.which);
				  },
				  mousemove: function(e){
					handleMouseMove(e);
					//action.hover(e);  
					//console.log(e.which);
				  }
				});
		
	