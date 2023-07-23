import { useEffect, useState } from 'react'
import {View,SafeAreaView,Text, TouchableOpacity, StyleSheet} from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
const data = [['','',''],['','',''],['','','']]
const ids = [['1','2','3'],['4','5','6'],['7','8','9']]
const styles=StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#f8b195'
  },
  gameContainer:{
    flex:0.5,
    justifyContent:'space-evenly',
    margin:8,
  },
  gameRow:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  gameBlock:{
    flex:1,
    padding:10,
    borderColor:'#333333',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  resetBtn:{
    padding:16,
    margin:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#355c7d',
    borderRadius:4
  },
  playerTitle:{
    padding:16,
    margin:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#6c5b7b',
    borderRadius:4
  },
  gameBlockText:{
    color:'#333333',
    fontSize:40
  },
  titleText:{
    fontWeight:'bold',
    fontSize:20
  },
  titleContainer:{
    flex:0.2,
    justifyContent:'center',
    alignItems:'center'
  },
  appTitle:{
    color:'#333333',
    fontSize:40

  },
  resultContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  resultText:{
    fontSize:30,
    color:'#333333'
  }
})
export default function App():JSX.Element{
  
  const [gameArray,setGameArray] = useState<string[][]>(JSON.parse(JSON.stringify(data)))
  const [turn,setTurn] = useState('O')
  const [won,setWon] = useState('')
  const [btnDisable,setBtnDisable] = useState(false)
  function isWon():boolean{
    for(let i=0;i<3;i++){
      let count=0
      for(let j=1;j<3;j++){
        if(gameArray[i][j]!='' && gameArray[i][j]==gameArray[i][j-1]) count++
      }
      // console.log(count)
      if(count==2) return true
    }
    for(let i=0;i<3;i++){
      let count=0
      for(let j=1;j<3;j++){
        if(gameArray[j][i]!='' && gameArray[j][i]==gameArray[j-1][i]) count++
      }
      if(count==2) return true
    }
    var diagonalCount = 0
    for(let i=1;i<3;i++){
      if(gameArray[i][i]!='' && gameArray[i-1][i-1]==gameArray[i][i]) diagonalCount++
    }
    if(diagonalCount==2) return true
    // if(gameArray[0][0]==gameArray[1][1] && gameArray[1][1]==gameArray[2][2]) return true
    
    var reverseDiagonal = 0
    for(let i=0;i<3;i++){
      for(let j=1;j<3;j++){
        if(i+j==2 && gameArray[i][j]!='' && gameArray[i][j]==gameArray[i+1][j-1]  ) reverseDiagonal++
      }
    }
    if(reverseDiagonal==2) return true

    // if(gameArray[0][2]==gameArray[1][1] && gameArray[1][1]==gameArray[2][0]) return true
    return false
  }
  useEffect(()=>{
    if(isWon()){ 
      setWon(turn=='O'?'X':'O')
      setBtnDisable(true)
    }
  },[turn])
  function putPattern(i:number,j:number):void{
    if(gameArray[i][j]==''){
    setGameArray(prev=>{
      prev[i][j]=turn
      return prev
    })
    // if(isWon()) setWon(turn)
    turn==='O'?setTurn('X'):setTurn('O')
    
  }
    
  }
  function reset():void{
    setTurn('O')
    setGameArray(JSON.parse(JSON.stringify(data)))
    setWon('')
    setBtnDisable(false)
  }
  return(
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.titleContainer}><Text style={styles.appTitle}>Tic-Tac-Toe</Text></View>
      {won && <View style={styles.resultContainer}><Text style={styles.resultText}>Player {won} won the match!</Text></View>}
      {won && <ConfettiCannon count={200} origin={{x: -10, y: 0}} explosionSpeed={200} fallSpeed={5000} fadeOut={true}/>}
      <View style={styles.gameContainer}>
        <View style={styles.playerTitle}><Text style={styles.titleText}>Player {turn}'s turn</Text></View>
        
        {gameArray.map((item,i)=><View style={styles.gameRow} key={i}>
          {item.map((item2,j)=><TouchableOpacity disabled={btnDisable} key={ids[i][j]} style={styles.gameBlock} onPress={()=>putPattern(i,j)}>
            <Text style={styles.gameBlockText}>{item2==''?'':item2}</Text>
            </TouchableOpacity>)}
        </View>
        )}
        <TouchableOpacity style={styles.resetBtn} onPress={()=>reset()}><Text style={styles.titleText}>Reset</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}