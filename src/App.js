
import React, {Component} from 'react';
import {DataSearch,ReactiveBase,ReactiveList,ResultList,SelectedFilters} from '@appbaseio/reactivesearch'; // eslint-disable-line

const {ResultListWrapper} = ReactiveList;

class App extends Component {
    render() {
        return ( 
            <div>
                <ReactiveBase
                    app = "cityindex"
                    url = "https://search-hiroki-app3-ulccwx5iv6spzusktmiqxv7pjy.ap-northeast-1.es.amazonaws.com/"
                >
                    <DataSearch
                        componentId = "search-component"
                        dataField = {["countryname"]}
                        queryFormat = "and"
                    />
                    <ReactiveList
                        componentId = "list-component"
                        pagination = {true}
                        size = {10}
                        react = {{
                            "and": ["search-component"]
                        }}
                        sortOptions={[
                            {label: "ランク", dataField: "rank", sortBy: "asc"}
                        ]}
                    >
                        {({data, error, loading}) => (
                            <ResultListWrapper>
                                {
                                    data.map(item => (
                                        <ResultList key = {item._id}>
                                            <ResultList.Content>
                                                <ResultList.Title
                                                    dangerouslySetInnerHTML = {{
                                                        __html: item.cityname
                                                    }}
                                                />
                                                <ResultList.Description>
                                                    <div> {item.countryname} </div>
                                                    <div> {item.population}万人 </div>
                                                </ResultList.Description>
                                            </ResultList.Content>
                                        </ResultList>
                                    ))
                                }
                            </ResultListWrapper>
                        )}
                    </ReactiveList>
                </ReactiveBase>
            </div>
        );
    }
}

export default App;