import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      post: '',
      delete: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:3000/getDoctors')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          doctors: data,
        });
      });
  }

  handlePostChange(event) {
    this.setState({ post: event.target.value });
  }

  handlePostSubmit(event) {
    event.preventDefault();
    const requestBody = { title: this.state.post };
    fetch('http://localhost:3000/api/post', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(() => this.fetchData());
  }

  handleDeleteChange(event) {
    this.setState({ delete: event.target.value });
  }

  handleDeleteSubmit(event) {
    event.preventDefault();
    const requestBody = { title: this.state.delete };
    fetch('http://localhost:3000/api/delete', {
      method: 'DELETE',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(() => this.fetchData());
  }

  render() {
    return (
      <div>
        <div>List of Doctors</div>
        {this.state.doctors.map((doctor) => {
          return (
            <div key={doctor._id}>
              {doctor._id}
              {doctor.name}
            </div>
          );
        })}
        <form onSubmit={this.handlePostSubmit.bind(this)}>
          <label>
            Post:
            <input
              type='text'
              name='name'
              onChange={this.handlePostChange.bind(this)}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <form onSubmit={this.handleDeleteSubmit.bind(this)}>
          <label>
            Delete:
            <input
              type='text'
              name='name'
              onChange={this.handleDeleteChange.bind(this)}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}
// const App = (props) => {

//   return (
//     <div>
//       <div>Hello World</div>
//     </div>
//   );
// };

export default App;
