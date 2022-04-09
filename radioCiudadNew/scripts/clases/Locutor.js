export default class Locutor {
    constructor(avatar,firsName,lastName,profileFacebook){
        this.avatar = avatar;
        this.firsName = firsName;
        this.lastName = lastName;
        this.profileFacebook = profileFacebook;
        this.fullName = `${firsName} ${lastName}`;
        this.id = (Math.random() * (2000 - 1000) + '1000').replace(/\./g, '');
    }

    getFullName(){
        return this.fullName
    }

    getFirsName(){
        return this.firsName
    }

    getAvatar(){
        return this.avatar
    }
}