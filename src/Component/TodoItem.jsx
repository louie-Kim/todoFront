import React from 'react'

const TodoItem = ({todo, onToggle, onDelete, onUpdate}) => {
  // inpu + label 을 id={todo.no}와  htmlFor={todo.no}로 연결
  // 1. 실제 label (동그라미) 이 클릭됨 <-> 2. input 체크 박스 클릭

  let {no, name, status} = todo
  
  
  // 서버에서 온 status -> 스타일 , 체크 박스 적용
  status = status == 1 ? true : false
  const className = status ? 'todoItem active':'todoItem'

  return (
    <li className={className}>
      
      <div className="item">
        {/* 체크박스 */}
        <input type="checkbox" 
               id={todo.no} 
               checked={status} 
               onChange={()=>onToggle(todo)}/>
        <label htmlFor={todo.no}></label>

        {/* 할일 입력*/}
        <input type="text" 
               id={`name-${todo.no}`}
               className='input' 
              //  value={todo.name}
               defaultValue={todo.name}
               />

      </div>

      <div className="item">
        <button className='btn btn-sm' onClick={()=>{
                                          todo.name = document.getElementById(`name-${todo.no}`).value
                                          onUpdate(todo)
                                                }}>수정</button>
        <button className='btn btn-sm' onClick={()=>onDelete(no)}>삭제</button>
      </div>
    </li>
  )
}

export default TodoItem