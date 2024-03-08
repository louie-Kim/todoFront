import React from 'react'

const TodoInput = ({input, onSubmit, onChange}) => {

 // value={input} : 없어도 onSubmit 동작함??
 /**
  * value={input}이 없는경우  
  * 리액트에서 상태(state)를 직접적으로 관리하지 않고, 
  * 사용자가 입력한 값을 DOM에서 직접 가져와서 처리하는 방식 
  * => 언컨트롤드 컴포넌트
  */

 //<form className='form' onSubmit={onSubmit}> : 현재페이지로 요청이 다시됨(새로고침)
 //입력 값 날라감~
  return (

    <div>
        <form className='form'  >
          <input placeholder='할일 입력'
                className='input'
                onChange={onChange}
                value={input}
                />
          <button type='button'
                  className='btn'
                  onClick={onSubmit}
                  >추가</button>
        </form>
    </div>
    
  )
}

export default TodoInput