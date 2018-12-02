import React, { Component } from "react";
import "./App.css";
import http from "./services/http.service";

const apiEndpoint = "http://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount = async () => {
    const { data: posts } = await http.get(apiEndpoint);
    this.setState({ posts });
  };

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    const originalPosts = this.state.posts;
    post.title = "UPDATED";

    //patch example
    //axios.patch(`${apiEndpoint}/${post.id}`, { title: post.title });

    //put example

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });

    try {
      await http.put(`${apiEndpoint}/${post.id}`, post);
    } catch (ex) {
      alert("Something failed while updating a post.");
      this.setState({ posts: originalPosts });
    }
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => post.id !== p.id);
    this.setState({ posts });

    try {
      await http.delete(`${apiEndpoint}/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
