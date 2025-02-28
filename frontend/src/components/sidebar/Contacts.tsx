import UsersList from "../conversation/UsersList";

const Contacts = () => {
    return ( 
        <div className="w-full custom-base-container h-full p-5">
            <div className="text-xl mb-3">Contacts</div>
            <div>
                <UsersList location="contacts"/>

            </div>
        </div>
     );
}
 
export default Contacts;