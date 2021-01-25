import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class Nasa extends Component {
  constructor(props) {
    super(props);
    this.state = {
        allPics:null,
        isLoading: true,
        value: '2020-01-23',
        startDate:new Date(),
    }
  }
    handleChange(date) {
      this.setState({startDate: date});
  }

  handleSubmit(event) {
      event.preventDefault()
      let dateFromInput = event.target[0].value;
      console.log(this.state.value)
      this.setState({
        value:dateFromInput
      });
  }
  
    componentDidMount(){
      // const newValue = this.state.newValue
      const value = this.state.value
       fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${value}&api_key=iIrjksofXlEmX9XGuVzGUQeN9SGu5XLrj3DAedmi`)
        .then(res => res.json())
        .then(
          (result)=> {
            this.setState({ allPics:result.photos, isLoading: false})
          }
        )
        .catch((err) => {
          console.log(err);
        });
      }

    componentDidUpdate(previousProps, previousState) {
      // const controller = new AbortController()
      const value = this.state.value
      const newValue = this.state.newValue
      // console.log(previousState.value)
      if (previousState.value !== this.state.value){
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${value}&api_key=iIrjksofXlEmX9XGuVzGUQeN9SGu5XLrj3DAedmi`)
        .then(res => res.json())
        .then(
          (result)=> {
            this.setState({ allPics:result.photos, isLoading: false})
          }
        )
      }else{
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${value}&api_key=iIrjksofXlEmX9XGuVzGUQeN9SGu5XLrj3DAedmi`)
        .then(res => res.json())
        .then(
          (result)=> {
            this.setState({ allPics:result.photos, isLoading: false})
          }
        )
      }
      // controller.abort();
  }

    render() {
        const {allPics, value,startDate } = this.state;
        return (
            this.state.isLoading ? <h2> Loading wait ...</h2> 
            :  <div className='container'>
              <div className="jumbotron">
                <h1 className="display-3">Hello, Alex!</h1>
                <p className="lead">Use the Mars Rover Photo Api to build a ‘landing page’ (get it) that displays the Mars
                                    photos on the most recent day with available data. Displaying photo metadata is
                                    optional/ up to personal aesthetic/design choices. Please include the ability to query
                                    for photos on a certain date as well -- (i.e. see mars when you were born etc. )</p>
                <hr className="my-4"/ >
                <ul id="Criteria">Evaluation Criteria:
                  <li>
                     ● Does the default homepage display images of Mars from the most recent day
                    with available data? (y/n)
                  </li>
                   <li>● Does the site have functionality that allows the user to query for photos from a
                    specific day? (y/n)</li>
                   <li>● Do the photos display correctly for the correct date? (y/n)</li>
                   <li> ● Error Handling</li>
                   <li> ● Code Organization</li>
                   <li>● Modularity</li>
                   <li>● Readability</li>
                   <li>● Usability / User experience</li>
                   <li> ● Does the ReadMe adequately walk through setup</li>
                   </ul>
                </div>
                <form className="row"onSubmit={(event)=>this.handleSubmit(event)} >
                 <label className="form-control-label" htmlFor="inputValid"style={{marginRight:15}} >Type year </label>
                  <div className="form-group">
                  <DatePicker
                      selected={ this.state.startDate }
                      onChange={(date)=>this.handleChange(date)}
                      name="startDate"
                      dateFormat="y-MM-dd"
                  />
                  <button className="btn btn-primary  btn-md" style={{marginLeft:15}}>Show pics of this day</button>
                  </div>              
                </form>
                  <br/>        
                  
                  if (value === '2021-01-23') {
                     <div className="card border-info mb-3" >
                      <div className="card-body">
                        <h4 className="card-title">Error! cant find any pictures for this day</h4>
                        <p>At this day photos are not exist! Please try deferent day </p>
                      </div>
                    </div> 
                   } else { 
                    <ul className="row" style={{display:'flex'}} >
                    {allPics.map(item => {
                    return(
                        <div className="card border-primary col-3"  style={{margin:5}} key={item.id}>
                            <div className="text-muted">{item.rover.name}</div>
                            <div className="card-body" style={{padding:1}}>
                            <img src={item.img_src} alt={item.rover.name} height="200" width="250" />
                            <h4 className="card-title" > { item.earth_date} </h4>
                            </div>
                          </div>
                        )
                    })} 
                </ul>  
                   }       
            </div>  
        )
    }
}

