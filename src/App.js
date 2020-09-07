import React from 'react';
import './App.css';
import {useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";
import LazyLoad from 'react-lazyload';


const CUSTOMERS_LIST = gql`
    # Consider giving this query a unique, descriptive
    # name in your application as a best practice
    query customerList {
        customers(limit: 100) {
            company_name
            address
            orders {
                order_id
                order_details {
                    product {
                        product_name
                    }
                }
            }
        }
    }
`;

function person_url(ind) {
    return 'https://thispersondoesnotexist.com/image?' + ind
}

function App() {
    const {data, loading, error} = useQuery(CUSTOMERS_LIST);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <React.Fragment>
            <h1>Pokémons</h1>

            <p>
                <a href="https://en.wikipedia.org/wiki/List_of_Pok%C3%A9mon">
                    The Customer franchise
                </a>{" "}
                starting with Bulbasaur in the top left corner and ending with Mewtwo in
                the bottom right corner.
            </p>
            <div className="container">
                {data &&
                data.customers &&
                data.customers.map((customer, index) => (
                    <div key={index} className="card">
                        <LazyLoad height={200} once>
                            <img src={person_url(index)}/>
                        </LazyLoad>
                        <div className="card-body">
                            <h3>{customer.company_name}</h3>
                            <p>{customer.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default App;
