export default class BusinessObject{
  constructor(){
		const today = new Date();
		this.id = 0;
		this.created_at = today;
		this.last_update_at = today;
	}

	setId(new_id){
		this.id = new_id;
	}

	getId(){
		return this.id;
	}

	setCreatedAt(new_date){
		this.created_at = new_date;
	}

	getCreatedAt(){
		return this.created_at;
	}

	setLastUpdateAt(new_date){
		this.last_update_at = new_date;
	}

	getLastUpdateAt(){
		return this.last_update_at;
	}

	toString(){
		let result = "";
		for (var prop in this){
			result += prop + ": " + this[prop] + " ";
		}
		return result
	}
}