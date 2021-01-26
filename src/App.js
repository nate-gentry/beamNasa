import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Welcome from "./component/Welcome";

// all consts must be here
const lastAvailedDate = "2021-01-25";

export default class Nasa extends Component {
// creating state to store all parameters 
  constructor(props) {
    super(props);
    this.state = {
      allPics: null,
      isLoading: true,
      value: lastAvailedDate,
      startDate: new Date(),
    };
  }

  // functions onClick and on Submit 
  handleChange(date) {
    this.setState({ startDate: date });
  }

  handleSubmit(event) {
    event.preventDefault();
    let dateFromInput = event.target[0].value;
    console.log(this.state.value);
    this.setState({
      value: dateFromInput,
    });
  }

  //receiving APi request and updating the state with saving all JSON 
  componentDidMount() {
    const value = this.state.value;
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${value}&api_key=iIrjksofXlEmX9XGuVzGUQeN9SGu5XLrj3DAedmi`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ allPics: result.photos, isLoading: false });
      })
      .catch((err) => {
        this.setState({ allPics: [], isLoading: false });
      });
  }

  // Updating API with user new data and re rendering new list 
  componentDidUpdate(previousProps, previousState) {
    const value = this.state.value;
    // console.log(previousState.value)
    if (previousState.value !== this.state.value) {
      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${value}&api_key=iIrjksofXlEmX9XGuVzGUQeN9SGu5XLrj3DAedmi`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({ allPics: result.photos});
        })
        .catch((err) => {
          this.setState({ allPics: [] });
        });
    }
  }

  render() {
    const { allPics, value} = this.state;
    if (this.state.isLoading) {
      return <h2> Loading wait ...</h2>;
    }
    return (
      <div className="container">
        {/*  component for seeing a Evaluation Criteria  */}
        <Welcome />
        <form className="row" onSubmit={(event) => this.handleSubmit(event)}>
          <label
            className="form-control-label"
            htmlFor="inputValid"
            style={{ marginRight: 15 }}
          >
            Type date as YYYY-MM-DD
          </label>
          <div className="form-group">
            <DatePicker
              selected={this.state.startDate}
              onChange={(date) => this.handleChange(date)}
              name="startDate"
              dateFormat="y-MM-dd"
            />
            <button
              className="btn btn-primary  btn-md"
              style={{ marginLeft: 15 }}
            >
              Show pics of this day
            </button>
          </div>
        </form>
        <br />
        {/* based on arr of Photos run thought all and shows as list with 3 picture per row  */}
        {value === lastAvailedDate ? (
          <div className="card border-info mb-3">
            <div className="card-body">
              <h4 className="card-title">
                Error! cant find any pictures for this day
              </h4>
              <p>At this day photos are not exist! Please try deferent day </p>
            </div>
          </div>
        ) : (
          <ul className="row" style={{ display: "flex" }}>
            {allPics.map((item) => {
              return (
                <div
                  className="card border-primary col-3"
                  style={{ margin: 5 }}
                  key={item.id}
                >
                  <div className="text-muted">{item.rover.name}</div>
                  <div className="card-body" style={{ padding: 1 }}>
                    <img src={item.img_src} alt={item.rover.name} />
                    <h4 className="card-title"> {item.earth_date} </h4>
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
