import TableList from "../components/ListTable";
const FacultyPage = () => {
  const students = [
    { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com'},
    { id: 6, name: 'Ali', age: 19, email: 'ali@email.com'},
    { id: 3, name: 'Saad', age: 16, email: 'saad@email.com'},
    { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'},
  ]
  return <>
    <div className="">
      <TableList data={students}/>
    </div>
  </>;
};

export default FacultyPage;


