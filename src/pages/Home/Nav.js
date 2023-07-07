import logo from './logo/logo.png'

function Nav() {
  return (
<>
<nav class="navbar navbar-light w-100"  style={{backgroundColor : " #032541"}}>
  <div className="container-fluid primary d-flex justify-content-start  ">
    <a className="navbar-brand text-white" href="/#">اختاري اكلتك</a>
    <img src={logo} style={{width : "50px " , marginRight : "10px"  }} className="App-logo   " alt="logo" />
 
  </div>
</nav>

</>
  );
}

export default Nav;