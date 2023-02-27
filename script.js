
let idP=localStorage.getItem('id')
if(idP==null){
	idP=0
	localStorage.setItem('id',idP)
}

function nextId(){
	let id=localStorage.getItem('id');

	return parseInt(id)+1

}

function elem (){
	
	var elemento=document.activeElement;
	console.log(elemento)
	if (elemento.checked) {
		let divElemento=document.getElementById('item'+elemento.id);
		let id=localStorage.getItem('id');
		let elementoLS=JSON.parse(localStorage.getItem(elemento.id));
		//localStorage.removeItem(elemento.id);
		let status=false
		elementoLS.status=status;
		localStorage.setItem(elemento.id,JSON.stringify(elementoLS))
		localStorage.id=id
		console.log(elementoLS) 
		//ele.style.display='none'
		// let statusAtv=ele.getAttribute('status');
		// let statusDes=ele.setAttribute('status','desativado')
	}else{
	       let divElemento=document.getElementById('item'+elemento.id);
		let id=localStorage.getItem('id');
		let elementoLS=JSON.parse(localStorage.getItem(elemento.id));
		//localStorage.removeItem(elemento.id);
		let status=true
		elementoLS.status=status;
		localStorage.setItem(elemento.id,JSON.stringify(elementoLS))
		localStorage.id=id
		console.log(elementoLS) 
		//ele.style.display='none'
		// let statusAtv=ele.getAttribute('status');
		// let statusDes=ele.setAttribute('status','desativado')
	}
}

function add(){

	let item = document.getElementById('valueItem').value;
	let id=nextId();	

	if(item==''){
		alert('prencha os campos')
		return false
	}else{
		//console.log(id)
		localStorage.setItem(id,JSON.stringify({item:item, status:false}))
		localStorage.setItem('id',id)

		document.getElementById('valueItem').value=''
	}
	document.getElementById('all').innerHTML=''
	way()
	//console.log(item)
}




function activo(id){
	let all=document.getElementById('al')
	let ac=document.getElementById('ac');
	let cp=document.getElementById('cp')
	if (id=='al') {
		all.classList='activeted'
		ac.classList='none'
		cp.classList='none'
	}else if ('ac'==id) {
		all.classList='none'
		ac.classList='activeted'
		cp.classList='none'
	}else if ('cp'==id) {
		all.classList='none'
		ac.classList='none'
		cp.classList='activeted'
	}
}

function way(type='all',item='al'){
	activo(item)
	if(type==='all'){
		document.getElementById('addItem').style.display='block'
		all.innerHTML=''
		all.style.display='block'
		active.style.display='none'
		completed.style.display='none'

		active.classList='none';
		completed.classList='none'
		let tamanho = parseInt(localStorage.getItem('id'))

		for (var i = 0; i <= tamanho; i++) {
			console.log(localStorage[i])

			if (localStorage[i]=== undefined) {
				continue
			}

			let item=JSON.parse(localStorage[i])
			//console.log(item)

			let div=document.createElement('div');
			div.classList='item '
			div.id='item'+i
			div.setAttribute('status',item.status)

			let input=document.createElement('input');
			input.addEventListener('click', elem())
			input.type='checkbox'
			input.checked=item.status
			input.id=i
			input.classList='item'

			let p=document.createElement('p');
			p.innerHTML=item.item;

			let btn=document.createElement('button');
			btn.innerHTML='Remove'
			btn.id=i;
			btn.onclick=()=>{
				let id = btn.id
				localStorage.removeItem(id)
			}

			if (item.status==='disabled') {
				div.disabled='disabled'
				input.checked=true;
				input.disabled='disabled'
				p.classList='textoToDo'
			}


			div.appendChild(input);
			div.appendChild(p)
			
			document.getElementById('all').appendChild(div)
		}
		
	}else if(type==='active'){
		document.getElementById('addItem').style.display='block'
		active.innerHTML=''
		all.style.display='none'
		active.style.display='block'
		completed.style.display='none'

		let tamanho = parseInt(localStorage.getItem('id'))+13
		for (var i = 0; i <= tamanho; i++) {
			console.log(localStorage[i])
			if (localStorage[i]=== undefined ) {
				console.log('cheagndo aqui')
				continue
			}

			let item=JSON.parse(localStorage[i])
				console.log('cheagndo aqui')
			if(item.status!='actived'){
				continue
			}
			let div=document.createElement('div');
			div.classList='item '
			div.id='item'+i
			div.setAttribute('status',item.status)

			let input=document.createElement('input');
			input.addEventListener('click', elem())
			input.type='checkbox'
			input.checked=item.status
			input.id=i
			input.classList='item'

			let p=document.createElement('p');
			p.innerHTML=item.item

			let btn=document.createElement('button');
			btn.innerHTML='Remove'
			btn.id=i;
			btn.onclick=()=>{
				let id = btn.id
				localStorage.removeItem(id)
			}

			if (item.status==='disabled') {
				div.style.border='1px solid red'
				div.disabled='disabled'
				input.checked=true;
				input.disabled='disabled'
			}

			div.appendChild(input);
			div.appendChild(p)
			
			document.getElementById('active').appendChild(div)
		}

	}else if(type === 'completed'){
		document.getElementById('addItem').style.display='none'
		completed.innerHTML=''
		all.style.display='none'
		active.style.display='none'
		completed.style.display='block'

		let tamanho = parseInt(localStorage.getItem('id'))+13
		for (var i = 0; i <= tamanho; i++) {
			if (localStorage[i]=== undefined ) {
				continue
			}

			let item=JSON.parse(localStorage[i])
			if (item.status==='actived') {
				continue
			}
			
			let div=document.createElement('div');
			div.classList='item '
			div.id=i
			div.setAttribute('status',item.status)

			let input=document.createElement('input');
			input.addEventListener('click', elem())
			input.type='checkbox'
			input.checked=item.status
			input.id=i
			input.classList='item'

			let p=document.createElement('p');
			p.innerHTML=item.item
			

			let btn=document.createElement('button');
			btn.innerHTML='del'
			btn.id=i;
			btn.classList='btn-excluir'
			btn.onclick=()=>{
				let id = btn.id
				localStorage.removeItem(id)
				way('completed','cp')
			}
			
			if (item.status==='disabled') {
				
				div.disabled='disabled'
				input.checked=true;
				input.disabled='disabled'
				p.classList='textoToDo'
			}

			div.appendChild(input);
			div.appendChild(p)
			div.appendChild(btn)
			document.getElementById('completed').appendChild(div)
		}

		let btnAll=document.createElement('button');
			btnAll.onclick=()=>{
				let tamanho = parseInt(localStorage.getItem('id'))
				let items=document.querySelectorAll('#completed div.item');
				console.log(items[0].id)
				items.forEach((e)=>{
					localStorage.removeItem(e.id)
				})

				way()
			};
			btnAll.innerHTML='deleteAll'

		document.getElementById('completed').appendChild(btnAll)

	}
}

//window.addEventListener('load',way);
