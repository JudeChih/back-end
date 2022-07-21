export default function ({ store, redirect }) {
	if(sessionStorage.getItem("loginData") == null){
		return redirect('/login')
	}
}
