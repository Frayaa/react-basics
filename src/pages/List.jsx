import { useEffect } from "react"

const List = () => {
  const [counter, setCounter] = useEffect(0)
  // componen Didmount
  // ke trigger setelah componen mount pertama kali
  useEffect(() => {
    alert("Hello")
  }, [])

  // componen DidUpdate
  // ketrigger setelah component menaglami update (props/state)
  // ketrigger setelah component mount pertama kali DAN
  useEffect(() => {
    alert("Counter berubah menjadi" + counter)
  }, [counter])
  // tiap kali 'counteer' ada perubahan, function terexecute

  // component will unmount
  // ke trigger sebelum component di-destroy
  useEffect(() => {
    return () => {
      alert("Goodbye")
    }
  }, [])

  return (
    <div>
      <h1>List Page</h1>
      <button onClick={() => setCounter(counter + 1)}>Tambah</button>
    </div>
  )
}

export default List
