import { useState } from 'react'


const AddTask = ({ onAdd }) => {

    const [text , setText] = useState('')
    const [day , setDay] = useState('')
    const [reminder , setReminder] = useState(false)


    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
            alert("please add task")
            return;
        }else{
            onAdd({ text , day , reminder})
            setText(text)
            setDay(day)
            setReminder(false)
        }
    }


    return <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type='text' placeholder='Add Task' 
                value={text} onChange={(e) => setText(e.target.value)}
            />
             </div>

            <div className="form-control ">
                <label>TimeStamp</label>
                <input type='text' placeholder='Add Task' 
                value={day} onChange={(e) => setDay(e.target.value)}
            />
            </div>

            <div className="form-control form-control-check">
                <label>set reminder</label>
                <input 
                    type='checkbox'
                    value={reminder}
                     onChange={(e) => setReminder
                        (e.currentTarget.checked)}
                    checked={reminder}

            />
            </div>

            <input type='submit' className='btn btn-block' value='Save Task' />
        </form>
}

export default AddTask
