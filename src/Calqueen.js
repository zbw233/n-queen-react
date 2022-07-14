import {useRef, useState} from 'react';
import './Calqueen.css'

function Cal () {
    const itemlist = new Array(64)
    for(let i=0;i<itemlist.length;i++){
        itemlist[i] ={
            key : i,
            info : ''
        }
    }

    const [inputState,setinputState]= useState(false)

    const [state,setState] =useState({
        infoList : '等待开始',
        Qnumber : -1,
        column : -1,
        line : -1,
        itemList : itemlist,
        board : [
            {
                key : 1,
                info : -1,
            },
            {
                key : 2,
                info : -1,
            },
            {
                key : 3,
                info : -1,
            },
            {
                key : 4,
                info : -1,
            },
            {
                key : 5,
                info : -1,
            },
            {
                key : 6,
                info : -1,
            },
            {
                key : 7,
                info : -1,
            },
            {
                key : 8,
                info : -1,
            },
        ],
        
    })

    let intervalhandler = useRef()
    let inputRef = useRef()

    const Start = () => {
        setinputState(true) 
        clearInterval(intervalhandler.current)
        intervalhandler.current=setInterval(() => {
            setState(state => nextStep(state))
        }, inputRef.current.value);
    }


    const nextStep = (state) => {
        const nextItemList = state.itemList
        const nextBoard = state.board
        let nextColumn = state.column
        let nextLine = state.line
        if(nextColumn === -1 || nextLine === -1){
            nextColumn = 0;
            nextLine = 0;
            nextItemList[( nextColumn + nextLine * 8)].info = 'Q'
            nextBoard[nextColumn].info = nextLine;
            return ({
                infoList : '下一步',
                Qnumber : 0,
                column : nextColumn,
                line : nextLine,
                itemList : nextItemList ,
                board : nextBoard,
            })
        }
    
        if(nextLine === 7){
            if(nextColumn === 7 && noConfliction(nextBoard,nextColumn)){
                return ({
                    infoList : '结束',
                    Qnumber : 0,
                    column : nextColumn,
                    line : nextLine,
                    itemList : nextItemList ,
                    board : nextBoard,
                })
            }
            if(nextColumn === 0){
                return ({
                    infoList : '失败',
                    Qnumber : 0,
                    column : nextColumn,
                    line : nextLine,
                    itemList : nextItemList ,
                    board : state.board,
                })
            }
            if(nextColumn !== 0){
                nextBoard[nextColumn].info = -1
                nextItemList[( nextColumn + nextLine * 8)].info = ''
                nextColumn =  nextColumn - 1
                nextItemList[(nextColumn + nextBoard[nextColumn].info * 8)].info = ''
                nextBoard[nextColumn].info = nextBoard[nextColumn].info + 1
                nextItemList[(nextColumn + nextBoard[nextColumn].info * 8)].info = 'Q'
                nextLine = nextBoard[nextColumn].info
                return ({
                    infoList : '回溯',
                    Qnumber : 0,
                    column : nextColumn,
                    line : nextLine,
                    itemList : nextItemList ,
                    board : nextBoard,
                })
            }
        }
    
        if(noConfliction(nextBoard,nextColumn)){
            nextColumn++;
            nextLine = 0;
            nextBoard[nextColumn].info = nextLine;
            nextItemList[( nextColumn + nextLine * 8)].info = 'Q'
            if(nextColumn){
            }
            return ({
                infoList : '下一步',
                Qnumber : 0,
                column : nextColumn,
                line : nextLine,
                itemList : nextItemList ,
                board : nextBoard,

            })
        }
    
       else{
            nextLine= nextLine === 7 ? 7 : nextLine+1;
            nextBoard[nextColumn].info = nextLine;
            nextItemList[(nextColumn + nextLine * 8)].info = 'Q'
            let key = nextItemList[( nextColumn + nextLine * 8)].key
            nextItemList[key-8].info = ''
            return ({
                infoList : '下一步',
                Qnumber : 0,
                column : nextColumn,
                line : nextLine,
                itemList : nextItemList ,
                board : nextBoard,
            })
        }
        
       }
       
       const noConfliction=(board,current) => {
         for (let i=0;i<current;i++){
            if(board[i].info===board[current].info){
              console.log(`${i}号Q与${current}号Q在一排`);
              return false;
            }
            if(current-i === Math.abs(board[i].info-board[current].info)){
              console.log(`${i}号Q与${current}号Q在对角`);
              return false
            }
         }
         console.log(`${current}号Q成功摆下`);
         return true
        }



    const Stop = () => {
        setinputState(false)
        clearInterval(intervalhandler.current)
    }

    function Reset(){
        setinputState(false)
        clearInterval(intervalhandler.current)
        setState(
            {
                infoList : '等待开始',
                Qnumber : -1,
                column : -1,
                line : -1,
                itemList : itemlist,
                board : [
                    {
                        key : 1,
                        info : -1,
                    },
                    {
                        key : 2,
                        info : -1,
                    },
                    {
                        key : 3,
                        info : -1,
                    },
                    {
                        key : 4,
                        info : -1,
                    },
                    {
                        key : 5,
                        info : -1,
                    },
                    {
                        key : 6,
                        info : -1,
                    },
                    {
                        key : 7,
                        info : -1,
                    },
                    {
                        key : 8,
                        info : -1,
                    },
                ],
                
            }
        )
    }

    return (
    <div>
       <Chart  itemList={state.itemList} infoList = {state.infoList}/>
       <Board board = {state.board}/>
       <button onClick={() => setState(state => nextStep(state)) }>下一步</button>
       <button onClick={() => Start() }>start</button>
       <button onClick={() => Stop() }>stop</button>
       <button onClick={() => Reset()}>reset</button>
       <input type="number" ref={inputRef} disabled = {inputState}></input>
    </div>
    ) 
}


// function nextStep(state) {
//     const nextItemList = state.itemList
//     const nextBoard = state.board
//     let nextColumn = state.column
//     let nextLine = state.line
//     if(nextColumn === -1 || nextLine === -1){
//         nextColumn = 0;
//         nextLine = 0;
//         nextItemList[( nextColumn + nextLine * 8)].info = 'Q'
//         nextBoard[nextColumn].info = nextLine;
//         return ({
//             infoList : '下一步',
//             Qnumber : 0,
//             column : nextColumn,
//             line : nextLine,
//             itemList : nextItemList ,
//             board : nextBoard,
//             endFlag :false,
//         })
//     }

//     if(nextLine === 7){
//         if(nextColumn === 7 && noConfliction(nextBoard,nextColumn)){
//             return ({
//                 infoList : '结束',
//                 Qnumber : 0,
//                 column : nextColumn,
//                 line : nextLine,
//                 itemList : nextItemList ,
//                 board : nextBoard,
//                 endFlag : true,
//             })
//         }
//         if(nextColumn === 0){
//             return ({
//                 infoList : '失败',
//                 Qnumber : 0,
//                 column : nextColumn,
//                 line : nextLine,
//                 itemList : nextItemList ,
//                 board : state.board,
//                 endFlag :false,
//             })
//         }
//         if(nextColumn !== 0){
//             nextBoard[nextColumn].info = -1
//             nextItemList[( nextColumn + nextLine * 8)].info = ''
//             nextColumn =  nextColumn - 1
//             nextItemList[(nextColumn + nextBoard[nextColumn].info * 8)].info = ''
//             nextBoard[nextColumn].info = nextBoard[nextColumn].info + 1
//             nextItemList[(nextColumn + nextBoard[nextColumn].info * 8)].info = 'Q'
//             nextLine = nextBoard[nextColumn].info
//             return ({
//                 infoList : '回溯',
//                 Qnumber : 0,
//                 column : nextColumn,
//                 line : nextLine,
//                 itemList : nextItemList ,
//                 board : nextBoard,
//                 endFlag :false,
//             })
//         }
//     }

//     if(noConfliction(nextBoard,nextColumn)){
//         nextColumn++;
//         nextLine = 0;
//         nextBoard[nextColumn].info = nextLine;
//         nextItemList[( nextColumn + nextLine * 8)].info = 'Q'
//         if(nextColumn){
//         }
//         return ({
//             infoList : '下一步',
//             Qnumber : 0,
//             column : nextColumn,
//             line : nextLine,
//             itemList : nextItemList ,
//             board : nextBoard,
//             endFlag :false,
//         })
//     }

//    else{
//         nextLine= nextLine === 7 ? 7 : nextLine+1;
//         nextBoard[nextColumn].info = nextLine;
//         nextItemList[(nextColumn + nextLine * 8)].info = 'Q'
//         let key = nextItemList[( nextColumn + nextLine * 8)].key
//         nextItemList[key-8].info = ''
//         return ({
//             infoList : '下一步',
//             Qnumber : 0,
//             column : nextColumn,
//             line : nextLine,
//             itemList : nextItemList ,
//             board : nextBoard,
//             endFlag :false,
//         })
//     }
    
//    }
   
//    function noConfliction(board,current) {
//      for (let i=0;i<current;i++){
//         if(board[i].info===board[current].info){
//           console.log(`${i}号Q与${current}号Q在一排`);
//           return false;
//         }
//         if(current-i === Math.abs(board[i].info-board[current].info)){
//           console.log(`${i}号Q与${current}号Q在对角`);
//           return false
//         }
//      }
//      console.log(`${current}号Q成功摆下`);
//      return true
//     }


// function Board() {
 
//   }


function Chart(props) {
    return(
      <div className= "chart">
      {props.infoList}
        <div>
            {props.itemList.map(
                item => <Item key={item.key} info={item.info}/>)}
        </div>
      </div>
        
    )
}

function Item(props) {
    return(
        <div className = "item">
            {props.info}
        </div>
    )
}

function Board(props) {
    return(
        <div className='board'>
            board
            <div >
                {props.board.map(item => <Item key={item.key} info={item.info}/>)}
            </div>  
        </div>
        
    )
}


function Calqueen() {
  return (
    <div>
     <Cal />
    </div>
  );
}


export default Calqueen;
