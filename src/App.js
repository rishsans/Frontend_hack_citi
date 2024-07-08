// import './App.css';
// import Login from './Component/Login';
// import RegistrationForm from './Component/Register';
// import AddMemberForm from './Component/AddMember';
// import AddExpenseForm from './Component/AddExpense';
// import Home from './Component/Home';
// import FriendCirclePage from './Component/CreateFriendCircle';
// import DisplayFriendList from './Component/DisplayFriendList';
// import Error from './Component/PageNotFound';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">

//       <BrowserRouter>

//         <Routes>
//           <Route index element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/friendcirclepage" element={<FriendCirclePage />} />
//           <Route path="/register" element={<RegistrationForm />} />
//           <Route path="/addmember" element={<AddMemberForm />} />
//           <Route path="/addexpense" element={<AddExpenseForm />} />
//           <Route path="/displayfriendlist" element={<DisplayFriendList />} />
//           <Route path="*" element={<Error />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import './App.css';
import Login from './Component/Login';
import RegistrationForm from './Component/Register';
import AddMemberForm from './Component/AddMember';
import AddExpenseForm from './Component/AddExpense';
import Home from './Component/Home';
import FriendCirclePage from './Component/CreateFriendCircle';
import DisplayFriendList from './Component/DisplayFriendList';
import Error from './Component/PageNotFound';
import FriendCircleName from './Component/FriendCircleName';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FriendCircleProvider } from './Component/FriendCircleContext';
import MemberList from './Component/MemberList';
import SettlementList from './Component/SettlementList';
import TransactionList from './Component/TransactionList';


function App() {
  return (
    <div className="App">
      <FriendCircleProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/friendcirclepage" element={<FriendCirclePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/memberlist" element={<MemberList />} />
            <Route path="/addmember" element={<AddMemberForm />} />
            <Route path="/addexpense" element={<AddExpenseForm />} />
            <Route path="/displayfriendlist" element={<DisplayFriendList />} />
            <Route path="/friendcirclename" element={<FriendCircleName />} />
            <Route path="/settlementlist" element={<SettlementList />} />
            <Route path="/transactionlist" element={<TransactionList />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </FriendCircleProvider>
    </div>
  );
}

export default App;