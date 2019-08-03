import React from 'react';
const faker = require('faker');
import $ from 'jquery';
import Description from './Description';
import styles from './style/App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            location: '',
            host: {},
            highlights: {},
            desc: {},
            detail: {},
            guess: 'test',
            amenity: {}
        }
    }

    componentDidMount(){
        this.getAmenInfo();
        this.getDescInfo();
    }

    getDescInfo() {
        const parts = window.location.href.split('/');
        const id = parts[parts.length - 2];
        $.ajax({
            method:'GET',
            url: `/listing/desc/${id}`,
            contentType: 'application/json',
            success: (desc) => {
                let bedList = desc.beds.split(',');
                this.setState({
                    title: desc.title,
                    location: desc.location,
                    host: {
                      name: desc.host_name,
                      pic: desc.host_pic
                    },
                    highlights: desc.highlights,
                    desc: {
                      General: desc.general,
                    },
                    detail: {
                      bedrmnum: desc.bed_rm_num,
                      beds: bedList,
                      bathrmnum: desc.bath_rm_num,
                      guestmax: desc.guest_max,
                      bednum: desc.bed_num,
                      type: desc.listing_type
                    }    
                })
            }
        })
    }

    getAmenInfo(){
        const parts = window.location.href.split('/');
        const id = parts[parts.length - 2];
        $.ajax({
            method:'GET',
            url: `/listing/amenity/${id}`,
            contentType: 'application/json',
            success: (amenityy) => {
                let amenities = {
                  Basic: {},
                  'Bed and bath': {},
                  Dining: {},
                  'Guest access': {},
                  'Safety features': {},
                  Logistics: {},
                  'Not included': {}
                }

                let amenityyObj = {};

                for (let i = 0; i < amenityy.length; i++) {
                  if (amenityy[i].category === 'basic') {
                    let amenityyName = amenityy[i].name;
                    amenityyObj[amenityyName] = amenityy[i];
                  } 
                }
                
                amenities['Basic'] = amenityyObj;
                console.log(amenities);

                this.setState({
                  amenity: amenities
                })
            }
        })
    }
    
    render() {
        return (
            <div className={styles.main}>
                <Description  
                title={this.state.title} location={this.state.location} host={this.state.host} highlights={this.state.highlights} desc={this.state.desc} detail={this.state.detail} amenity={this.state.amenity}
                />
            </div>
        )
    }
}
    
export default App;