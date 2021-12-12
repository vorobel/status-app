import React, { useState, useEffect } from 'react';
import { sortByName, transformData } from './utils/utils';
import { ImageContainer, IconImage, ItemWrapper, RedSquare, GreenSquare, ItemName } from './styled-containers';


function App() {
  const [data, setData] = useState([]);
  const [dataWithStatus, setDataWithStatus] = useState([]);

  const fetchData = () => {
    fetch('https://app.subsocial.network/subid/api/v1/chains/properties')
      .then(response => response.json())
      .then(data => setData(transformData(data)))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchData()
  }, []);


  useEffect(() => {
    let promises = [];
    data.forEach(item => {
      promises.push(fetch(`https://app.subsocial.network/subid/api/v1/check/${item.productName}`)
        .then(response => response.json()
          .then(itemStatus => {
            return { ...item, itemStatus }
          })
        ))
    });

    Promise.all(promises)
      .then(data => setDataWithStatus(data.sort((a, b) => sortByName(a, b))))
      .catch(error => console.log(error))


    setTimeout(() => {
      fetchData()
    }, 1000 * 60 * 5)
  }, [data]);

  return (
    <div className="App">
      {dataWithStatus.map(item => {
        return (
          <ItemWrapper key={item.productName}>
            <ImageContainer>
              <IconImage
                src={`https://app.subsocial.network/subid/icons/${item.icon}`}
                alt="icon"
              />
            </ImageContainer>
            <ItemName>{item.name}</ItemName>
            {item.itemStatus ? <GreenSquare /> : <RedSquare />}
          </ItemWrapper>
        )
      })}
    </div>
  );
}

export default App;
