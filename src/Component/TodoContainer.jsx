import React, { useEffect, useState  } from 'react'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import TodoFooter from './TodoFooter'

const TodoContainer = () => {

  
  const [todoList, setTodoList] = useState([]);
  const[input, setInput] = useState('')


  //목록 불러오기---------------------------------------------------------------
  useEffect(()=>{

    //mount, update 시 동작하는 코드
    //http 요청 정보 없이 보내면 기본 GET방식 
    fetch('http://127.0.0.1:8080/todos')
          .then((response)=> response.json())
          .then((data)=> setTodoList(data))
          .catch((error)=> console.log(error))

    return () =>{
      //unmount
    }

  },[])

  //할일 등록-----------------------------------------------------------------
  const onSubmit=()=>{
    console.log('할일: ', input);

    if(input == ''){
      // alert('할일 내용을 입력해주세요')
      // return
    }

    const data ={
      name : input == '' ? '제목 없음': input ,   // 할일 내용
      status : 0,
    }

    const init = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data) //제이슨 형식으로 요청
    }

    fetch('http://127.0.0.1:8080/todos',init)
          .then((response)=> response.json())
          .then((data)=> setTodoList([data, ...todoList]))
          .catch((error)=> console.log(error))
    
    //
    setInput('')
  }
  //할일 입력 수정----------------------------------------------------------
  const onChange = (e) => {
    console.log(e.target.value)
    setInput(e.target.value) 
  }

  //할일 토글--------------------------------------------------------------
  const onToggle=(todo)=>{

    console.log('할일 완료 여부 처리');
    console.log(todo);

    //여기서 status 반전~
    const data = {
      no: todo.no,
      name: todo.name,
      status: todo.status ? 0 : 1,
      // status: todo.status == 0 ? 1 : 0,
    }

    const init ={
      method : 'PUT',
      headers :{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://127.0.0.1:8080/todos',init)
          .then((response)=> response.text())
          .then((data)=> console.log(data) )
          .catch((error)=> console.log(error))

    //화면 렌더링, 정렬작업
    /**
     * /todo.no = 내가 클릭한 할일
     *  item.no = 원래 있던 할일
     * 
     *  b.no-a.no : no 기준 내림차순
     *  a.status-b.status :  status 기준 오름차순
     * 
     *  updatedTodoList: status가 반전된 []
     */

    // let updatedTodoList = todoList.map((item)=>{
    //   return item.no === todo.no ? {...item, status: !item.status }:item 
    // })
    // //a.status - b.status == 0 : status가 같은으면 ...
    // //
    // let sortedTodoList = updatedTodoList.sort((a,b)=>{
    //   // console.log('sorting...',a,b);
    //   return a.status - b.status == 0 ? b.no-a.no : a.status-b.status
    // })

    const sortedTodoList = todoList.map((item)=>  item.no === todo.no ? {...item, status: !item.status }:item )
                                 .sort((a,b) => a.status - b.status == 0 ? b.no-a.no : a.status-b.status )

    setTodoList(sortedTodoList)
  }

  // 할일 삭제 --------------------------------------------------------------------------

  const onDelete =(no)=>{

    const init ={
      method : 'DELETE',
    }

    fetch(`http://127.0.0.1:8080/todos/${no}`,init)
          .then((response)=> response.text())
          .then((data)=> console.log(data) )
          .catch((error)=> console.log(error))

    //브라우저에서 할일 삭제: 달참 같거
    const updatedTodoList = todoList.filter((todo) =>  todo.no != no)

    setTodoList(updatedTodoList)

  }

  //전체 삭제 -----------------------------------------------------------
  const onDelteAll =()=>{

    
    const init ={
      method : 'DELETE',
    }

    fetch(`http://127.0.0.1:8080/todos/-1`,init)
          .then((response)=> response.text())
          .then((data)=> console.log(data) )
          .catch((error)=> console.log(error))


    setTodoList([])

  }

  //전체 완료----------------------------------------------------
  const onCompleteAll=()=>{

    const data = {
      no: -1,
    }

    const init ={
      method : 'PUT',
      headers :{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://127.0.0.1:8080/todos',init)
          .then((response)=> response.text())
          .then((data)=> console.log(data) )
          // .then((data)=> setTodoList(data) )
          .catch((error)=> console.log(error))


    //화면 렌더링
    //{ ...item, status: 1 } : 객체
    /**
     * const sortedTodoList = todoList.map((item) => { return { ...item, status: 1 }; });
     *                                   return 키워드를 사용하여 명시적으로 객체를 반환  
     */                                                                           
    const sortedTodoList 
            = todoList.map((item)=>  ({ ...item, status: 1}) ) //명시적으로 객체를 반환
                      // .sort((a,b) => a.status - b.status == 0 ? b.no-a.no : a.status-b.status )

    
    setTodoList(sortedTodoList)

  }

  //할일 수정 ------------------------------------------------------------
  const onUpdate=(todo)=>{

    console.log('할일 수정 처리');
    console.log(todo);

    
    const data = {
      no: todo.no,
      name: todo.name, // 여기만 변경
      status: todo.status,
      
    }

    const init ={
      method : 'PUT',
      headers :{
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://127.0.0.1:8080/todos',init)
          .then((response)=> response.text())
          .then((data)=> console.log(data) )
          .catch((error)=> console.log(error))

    // //화면 렌더링, 정렬작업
    // const sortedTodoList = todoList.map((item)=>  item.no === todo.no ? {...item, status: !item.status }:item )
    //                              .sort((a,b) => a.status - b.status == 0 ? b.no-a.no : a.status-b.status )

    // setTodoList(sortedTodoList)
  }



  return (
    <div className="container">
        <TodoHeader/>
        <TodoInput input={input} onSubmit={onSubmit} onChange={onChange}/>
        <TodoList todoList={todoList} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate}/>
        <TodoFooter onDelteAll={onDelteAll} onCompleteAll={onCompleteAll}/>
    </div>
  )
}

export default TodoContainer