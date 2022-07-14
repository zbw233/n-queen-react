// import {useState} from 'react';


// function Calqueen () {
//   const board = [-1,-1,-1,-1,-1,-1,-1,-1]
//   return (
//   <div>
//     <Queen board = {board} current = {0} />
//   </div>
//   ) 
// }


// function Queen ({board,current}) {
//     console.log('开始下一次计算');
//   if(current === 8){
//     console.log('结束');
//     return true
//   }
//   for (let i in board) {
//     board[current] = i;
//     console.log(board);
//     console.log(`${current}号在${current}列${i}行`);
//     if(noConfliction(board,current)){
//       let done = queen(board,current+1)
//       if(done){
//         return true;
//       }
//     }
//   }
//   console.log(`${current}号Q在${current-1}号Q的目前摆法下全部无法满足条件，回退`);
//   return false;
// }


// function queen (board,current) {
//   setTimeout(() => {
//     console.log('开始下一次计算');
//   if(current === 8){
//     console.log('结束');
//     return true
//   }
//   for (let i in board) {
//     board[current] = i;
//     console.log(board);
//     console.log(`${current}号在${current}列${i}行`);
//     if(noConfliction(board,current)){
//       let done = queen(board,current+1)
//       if(done){
//         return true;
//       }
//     }
//   }
//   console.log(`${current}号Q在${current-1}号Q的目前摆法下全部无法满足条件，回退`);
//   return false;
//   }, 10000);
// }



// function noConfliction(board,current) {
//  for (let i=0;i<current;i++){
//     if(board[i]===board[current]){
//       console.log(`${i}号Q与${current}号Q在一排`);
//       return false;
//     }
//     if(current-i === Math.abs(board[i]-board[current])){
//       console.log(`${i}号Q与${current}号Q在对角`);
//       return false
//     }
//  }
//  console.log(`${current}号Q成功摆下`);
//  return true

// }

// function App() {
//   return (
//     <div>
//      <Calqueen />
//     </div>
//   );
// }

// export default App;
