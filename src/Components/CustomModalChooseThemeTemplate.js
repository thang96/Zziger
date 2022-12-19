import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {colors, icons, images} from '../Constants';
import CustomButtonLogo from './CustomButtonLogo';
import {uuid} from '../Utils/uuid';
import CustomTextInput from './CustomTextInput';
import CustomButton from './CustomButton';
import CustomTwoBottomButtonFuntion from './CustomTwoBottomButtonFuntion';

const FAKE_DATA = [
  {
    title: 'Template 01',
    listCard: [
      {
        uri: 'https://icp-vn.com/wp-content/uploads/2017/06/in-card-vist-1-min.jpeg',
      },
      {
        uri: 'https://vietadv.net/wp-content/uploads/2021/05/Card-visit-la-gi.png',
      },
      {uri: 'https://intphcm.com/data/upload/mau-card-visit-giam-doc-dep.jpg'},
      {
        uri: 'https://incucdep.com/wp-content/uploads/2017/05/card-visit-cao-cap-08.jpg',
      },
    ],
  },
  {
    title: 'Template 02',
    listCard: [
      {
        uri: 'https://icp-vn.com/wp-content/uploads/2017/06/in-card-vist-1-min.jpeg',
      },
      {
        uri: 'https://vietadv.net/wp-content/uploads/2021/05/Card-visit-la-gi.png',
      },
      {uri: 'https://intphcm.com/data/upload/mau-card-visit-giam-doc-dep.jpg'},
      {
        uri: 'https://incucdep.com/wp-content/uploads/2017/05/card-visit-cao-cap-08.jpg',
      },
    ],
  },
  {
    title: 'Template 03',
    listCard: [
      {
        uri: 'https://icp-vn.com/wp-content/uploads/2017/06/in-card-vist-1-min.jpeg',
      },
      {
        uri: 'https://vietadv.net/wp-content/uploads/2021/05/Card-visit-la-gi.png',
      },
      {uri: 'https://intphcm.com/data/upload/mau-card-visit-giam-doc-dep.jpg'},
      {
        uri: 'https://incucdep.com/wp-content/uploads/2017/05/card-visit-cao-cap-08.jpg',
      },
    ],
  },
];
const CustomModalChooseThemeTemplate = props => {
  const imageWidth = Dimensions.get('window').width - 20;
  const {modalVisible, onRequestClose, closeModal, changeImage} = props;
  const [showDetail, setShowDetail] = useState(false);

  const [detailTemplate, setDetailTemplate] = useState(null);

  const renderItemCard = (item, index) => {
    return (
      <View style={{marginBottom: 20}}>
        <View style={[styles.viewRowRender, {marginBottom: 5}]}>
          <Text style={styles.titleRender}>{item.title}</Text>
          <CustomButton
            title={'More'}
            styleText={styles.styleTextMore}
            onPress={() => {
              setDetailTemplate(item);
              setShowDetail(true);
            }}
          />
        </View>
        <ScrollView horizontal>
          {item?.listCard.map(imageValue => {
            return (
              <TouchableOpacity
                key={imageValue?.uri}
                onPress={() => changeImage(imageValue?.uri)}>
                <Image
                  source={{uri: imageValue?.uri}}
                  style={styles.imageRender}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={[styles.eachContainer, {height: '55%'}]}>
          {!showDetail ? (
            <View style={styles.viewListItem}>
              <View style={styles.viewRow}>
                <Text style={styles.title}>Theme Template</Text>
                <CustomButtonLogo
                  source={icons.ic_closeRed}
                  styleButton={{width: 25, height: 25}}
                  onPress={closeModal}
                />
              </View>
              <CustomTextInput
                disabled={false}
                image={icons.ic_search}
                placeholder={'Seach template'}
                styleViewInput={styles.styleCustomTextInput}
              />
              <FlatList
                data={FAKE_DATA}
                keyExtractor={key => key?.title}
                renderItem={({item, index}) => renderItemCard(item, index)}
              />
            </View>
          ) : (
            <View style={styles.viewListItem}>
              <View style={styles.viewRow}>
                <View style={styles.viewRowRender}>
                  <CustomButtonLogo
                    onPress={() => setShowDetail(false)}
                    source={icons.ic_back}
                    styleButton={{width: 25, height: 25, marginRight: 50}}
                  />
                  <Text style={styles.title}>{detailTemplate?.title}</Text>
                </View>

                <CustomButtonLogo
                  source={icons.ic_closeRed}
                  styleButton={{width: 25, height: 25}}
                  onPress={closeModal}
                />
              </View>
              <ScrollView>
                {detailTemplate?.listCard.map(item => {
                  return (
                    <TouchableOpacity
                      key={item?.uri}
                      onPress={() => changeImage(item?.uri)}>
                      <Image
                        source={{uri: item?.uri}}
                        style={{
                          width: imageWidth,
                          height: imageWidth / 1.8,
                          borderRadius: 10,
                          marginVertical: 15,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* <CustomTwoBottomButtonFuntion
                styleTwoButton={{height: 50, marginTop: 20}}
                titleLeft={'Back'}
                titleRight={'Apply'}
                styleTextLeft={{color: 'white'}}
                styleTextRight={{color: 'white'}}
                styleButtonLeft={{backgroundColor: colors.backgroundButtonRed}}
                styleButtonRight={{backgroundColor: colors.backgroundButton}}
                onPressLeft={() => setShowDetail(false)}
                onPressRight={() => {}}
              /> */}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eachContainer: {
    backgroundColor: colors.backgroundInput,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(199,199,199)',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {color: 'grey', fontWeight: '500', fontSize: 16, marginBottom: 5},
  viewListItem: {
    paddingHorizontal: 10,
    flex: 1,
  },
  styleCustomTextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    width: '100%',
    marginVertical: 10,
  },
  titleRender: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  imageRender: {
    borderRadius: 10,
    width: 160,
    height: 160 / 1.8,
    marginRight: 5,
  },
  styleTextMore: {color: colors.backgroundButtonGreen, fontSize: 15},
  viewRowRender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default CustomModalChooseThemeTemplate;
