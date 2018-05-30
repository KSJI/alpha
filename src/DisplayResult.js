import React from "react";
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import DisplayResultCSS from "./DisplayResult.css"

export default class DisplayResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: "",
            typeOfMeal: "",
            madeFrom: "",
            totalCalories: "",
            uid: "",
            data: [],
            urls: "https://firebasestorage.googleapis.com/v0/b/alpha-153de.appspot.com/o/images%2FDeleting%20a%20New%20Post.png?alt=media&token=ecc366b8-fe92-4a5b-815d-02b335bafd9c",
            fbError: ""
        };
    }
    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState(
                {uid: user.uid,
                meal: user.meal,
                typeOfMeal: user.typeOfMeal,
                madeFrom: user.madeFrom,
                totalCalories: user.totalCalories,
                data: user.data,
                urls: user.urls
                })
            }
        })

        //remove this later
        var data = {
            "results": [
                {
                    "info": {
                        "background_colors": [
                            {
                                "b": "146",
                                "g": "121",
                                "closest_palette_distance": 6.607301706546877,
                                "closest_palette_color_parent": "blue",
                                "r": "82",
                                "html_code": "#527992",
                                "closest_palette_color_html_code": "#6e7e99",
                                "closest_palette_color": "larkspur",
                                "percentage": 48.68
                            },
                            {
                                "b": "46",
                                "g": "90",
                                "closest_palette_distance": 2.002274829533564,
                                "closest_palette_color_parent": "skin",
                                "r": "137",
                                "html_code": "#895a2e",
                                "closest_palette_color_html_code": "#8c5e37",
                                "closest_palette_color": "light bronze",
                                "percentage": 40.74
                            },
                            {
                                "b": "36",
                                "g": "54",
                                "closest_palette_distance": 6.404418053708967,
                                "closest_palette_color_parent": "brown",
                                "r": "82",
                                "html_code": "#523624",
                                "closest_palette_color_html_code": "#584039",
                                "closest_palette_color": "brownie",
                                "percentage": 10.58
                            }
                        ],
                        "color_variance": "36",
                        "object_percentage": "2.30",
                        "image_colors": [
                            {
                                "b": "45",
                                "g": "83",
                                "percent": 51.68,
                                "closest_palette_color_parent": "skin",
                                "r": "126",
                                "html_code": "#7e532d",
                                "closest_palette_color_html_code": "#7c5a2c",
                                "closest_palette_color": "medium brown",
                                "closest_palette_distance": 4.145651666822428
                            },
                            {
                                "b": "145",
                                "g": "121",
                                "percent": 48.22,
                                "closest_palette_color_parent": "blue",
                                "r": "83",
                                "html_code": "#537991",
                                "closest_palette_color_html_code": "#6e7e99",
                                "closest_palette_color": "larkspur",
                                "closest_palette_distance": 6.643697722134033
                            }
                        ],
                        "color_percent_threshold": 1.75,
                        "foreground_colors": [
                            {
                                "b": "52",
                                "g": "69",
                                "closest_palette_distance": 2.5701833132187457,
                                "closest_palette_color_parent": "brown",
                                "r": "98",
                                "html_code": "#624534",
                                "closest_palette_color_html_code": "#5d473a",
                                "closest_palette_color": "latte",
                                "percentage": 53.99
                            },
                            {
                                "b": "136",
                                "g": "156",
                                "closest_palette_distance": 4.741182409559405,
                                "closest_palette_color_parent": "light brown",
                                "r": "181",
                                "html_code": "#b59c88",
                                "closest_palette_color_html_code": "#b09080",
                                "closest_palette_color": "cappuccino",
                                "percentage": 29.24
                            },
                            {
                                "b": "39",
                                "g": "40",
                                "closest_palette_distance": 6.083666083751362,
                                "closest_palette_color_parent": "black",
                                "r": "47",
                                "html_code": "#2f2827",
                                "closest_palette_color_html_code": "#3a3536",
                                "closest_palette_color": "graphite",
                                "percentage": 16.77
                            }
                        ]
                    },
                    "image": "https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg"
                }
            ],
            "unsuccessful": []
        }
        data = data.results[0].info.image_colors;
        this.setState({data: data, meal: "blueberry"});
        
    }
    componentWillUnmount() {
        this.authUnlisten();
    }    

    render() {
        const TableRow = ({row}) => (
            <tr>
              <td key={row.percent}>{row.percent}</td>
              <td key={row.html_code}>{row.html_code}</td>
            </tr>
          )
          const Table = ({data}) => (
            <table>
              {data.map(row => {
                <TableRow row={row} />
              })}
            </table>
          )
        // <img src={this.state.urls} alt="golf"/>
        //{data.map(data => <h4>{data.percent}</h4>)}
        // <div class="color-box" style={{background_colors: "#2f2827"}}></div>
        let data = this.state.data
        return (
            <div>
                <p>{this.state.meal}</p>
                <img src={this.state.urls} alt="food"/>
                <p>colors</p>
                {data.map(data => <div className="input-color"><div className="color-box" style={{backgroundColor: data.html_code}}>{console.log(data.html_code)}</div></div>
                )}
                <p>percentage</p>
                {data.map(data => <p>{data.percent} %</p>)}
            </div>
        )

    }

}