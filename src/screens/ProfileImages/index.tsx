import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import ImageView from "react-native-image-viewing";
import images from '../../assets/images/images';
import Header from '../../components/Header/Header';
import { request } from 'react-native-permissions';
import RNFS from 'react-native-fs'; // Import react-native-fs
import { getProfileImgs } from '../../api/Httpservice';
import Config from '../../utils/config';
const NUM_COLUMNS = 2;
interface poetryImgData {
    imgUrl: any;
    // hide: any
}
const ProfileImages: React.FC<any> = ({ navigation }) => {
    const [image, setImages] = useState<poetryImgData[]>([])
    useEffect(() => {
       
        poetryImgs()
    }, [])
    const downloadImage = async (imageUrl: string) => {

        try {
            const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

            if (permissionStatus === 'granted') {

                const downloadDir = RNFS.DownloadDirectoryPath;
                const filename = `downloaded-image-${Date.now()}.jpg`;
                const filePath = `${downloadDir}/${filename}`;

                try {
                    const response = await RNFS.downloadFile({
                        fromUrl: imageUrl,
                        toFile: filePath,
                    });

                    if (response) {
                        console.log('Image downloaded to:', filePath);
                        Alert.alert('Image downloaded successfully!');
                    } else {
                        console.error('Image download failed with status:', response);
                        Alert.alert('Image download failed!');
                    }
                } catch (error) {
                    console.error('Error downloading image:', error);
                    Alert.alert('Error downloading image!');
                }
            } else {
                console.log('Permission denied');
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    };
    const poetryImgs = async () => {
        try {
            const response = await getProfileImgs();
            setImages(response?.data);
            console.log(response?.data[0]?.imgUrl);
            console.log("data", `${Config.BASE_URL}${image[3]?.imgUrl}`)
            console.log("images data: ", response?.data)
        } catch (error) {
            console.error('Error fetching images data:', error);
        }
    };
    const [previewVisible, setPreviewVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const togglePreviewModal = (index: number) => {
        console.log(index, "this is index")
        setSelectedImageIndex(index);
        console.log(selectedImageIndex);
        setPreviewVisible(!previewVisible);
    };
    useEffect(() => {
        console.log(selectedImageIndex, "index");
    }, [selectedImageIndex]);
    const handleDownload = async () => {
        console.log('selectedImage', selectedImage)
        console.log('selectedImageIndex', selectedImageIndex)
        Alert.alert("Hello", "Download Press")
        // if (selectedImage) {
        //   try {
        //     const response = await RNFS.downloadFile({
        //       fromUrl: selectedImage.uri,
        //       toFile: `${RNFS.DocumentDirectoryPath}/${selectedImage.fileName}`,
        //     });

        //     if (response.statusCode === 200) {
        //       console.log('Image downloaded successfully.');
        //     } else {
        //       console.log('Failed to download image.');
        //     }
        //   } catch (error) {
        //     console.error('Error downloading image:', error);
        //   }
        // }
    };
    const imageArray = [
        'https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg',
        'https://e0.pxfuel.com/wallpapers/675/1019/desktop-wallpaper-97405-serene-landcapes-background.jpg',
        'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?cs=srgb&dl=pexels-artem-saranin-1187079.jpg&fm=jpg',
        'https://images.pexels.com/photos/1887624/pexels-photo-1887624.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-1887624.jpg&fm=jpg',
        'https://i.pinimg.com/236x/4c/56/14/4c5614387832a1aa00893dd750c80064.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0LFFqggoNdREiNl5tj_2d0TwWQRcVhpt9bQ&usqp=CAU',
        'https://w0.peakpx.com/wallpaper/755/492/HD-wallpaper-flowering-dewdrops-pretty-cool-blade-of-grass-bubbles-unique.jpg',
        'https://t4.ftcdn.net/jpg/05/57/57/63/360_F_557576322_am5DuFwdo7GNMlKh3kCfTvKVxDMaKPNL.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CBkS7_dGnRZvFT6QaEdlcKp1OrB9srTTlLBzytFrmEXJ_Zruwr6lsQvlyX9xOPJpN3o&usqp=CAU',
        'https://c4.wallpaperflare.com/wallpaper/431/451/684/the-most-beautiful-picture-of-nature-wallpaper-preview.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIim_X8iriwbS7Oj60j4zUDqTpCZxuY3iMKDNXY6O5S_CJll5KecFRv8I-OhFS4bWwhWY&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi1GOR5gX-UMuh1TfpD88SKaKSQ0toLcY3YQ&usqp=CAU',
        'https://e0.pxfuel.com/wallpapers/192/1/desktop-wallpaper-rose-splash-rose-flower-love-splash-water.jpg',
        'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_640.jpg',
        'https://c4.wallpaperflare.com/wallpaper/736/96/920/beautiful-unicorn-in-forest-fantasy-computer-desktop-wallpapers-hd-2560%C3%971600-wallpaper-preview.jpg',
        'https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg',
        'https://e0.pxfuel.com/wallpapers/675/1019/desktop-wallpaper-97405-serene-landcapes-background.jpg',
        'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?cs=srgb&dl=pexels-artem-saranin-1187079.jpg&fm=jpg',
        'https://images.pexels.com/photos/1887624/pexels-photo-1887624.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-1887624.jpg&fm=jpg',
        'https://i.pinimg.com/236x/4c/56/14/4c5614387832a1aa00893dd750c80064.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0LFFqggoNdREiNl5tj_2d0TwWQRcVhpt9bQ&usqp=CAU',
        'https://w0.peakpx.com/wallpaper/755/492/HD-wallpaper-flowering-dewdrops-pretty-cool-blade-of-grass-bubbles-unique.jpg',
        'https://t4.ftcdn.net/jpg/05/57/57/63/360_F_557576322_am5DuFwdo7GNMlKh3kCfTvKVxDMaKPNL.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CBkS7_dGnRZvFT6QaEdlcKp1OrB9srTTlLBzytFrmEXJ_Zruwr6lsQvlyX9xOPJpN3o&usqp=CAU',
        'https://c4.wallpaperflare.com/wallpaper/431/451/684/the-most-beautiful-picture-of-nature-wallpaper-preview.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIim_X8iriwbS7Oj60j4zUDqTpCZxuY3iMKDNXY6O5S_CJll5KecFRv8I-OhFS4bWwhWY&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi1GOR5gX-UMuh1TfpD88SKaKSQ0toLcY3YQ&usqp=CAU',
        'https://e0.pxfuel.com/wallpapers/192/1/desktop-wallpaper-rose-splash-rose-flower-love-splash-water.jpg',
        'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_640.jpg',
        'https://c4.wallpaperflare.com/wallpaper/736/96/920/beautiful-unicorn-in-forest-fantasy-computer-desktop-wallpapers-hd-2560%C3%971600-wallpaper-preview.jpg',
        'https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg',
        'https://e0.pxfuel.com/wallpapers/675/1019/desktop-wallpaper-97405-serene-landcapes-background.jpg',
        'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?cs=srgb&dl=pexels-artem-saranin-1187079.jpg&fm=jpg',
        'https://images.pexels.com/photos/1887624/pexels-photo-1887624.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-1887624.jpg&fm=jpg',
        'https://i.pinimg.com/236x/4c/56/14/4c5614387832a1aa00893dd750c80064.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0LFFqggoNdREiNl5tj_2d0TwWQRcVhpt9bQ&usqp=CAU',
        'https://w0.peakpx.com/wallpaper/755/492/HD-wallpaper-flowering-dewdrops-pretty-cool-blade-of-grass-bubbles-unique.jpg',
        'https://t4.ftcdn.net/jpg/05/57/57/63/360_F_557576322_am5DuFwdo7GNMlKh3kCfTvKVxDMaKPNL.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CBkS7_dGnRZvFT6QaEdlcKp1OrB9srTTlLBzytFrmEXJ_Zruwr6lsQvlyX9xOPJpN3o&usqp=CAU',
        'https://c4.wallpaperflare.com/wallpaper/431/451/684/the-most-beautiful-picture-of-nature-wallpaper-preview.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIim_X8iriwbS7Oj60j4zUDqTpCZxuY3iMKDNXY6O5S_CJll5KecFRv8I-OhFS4bWwhWY&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi1GOR5gX-UMuh1TfpD88SKaKSQ0toLcY3YQ&usqp=CAU',
        'https://e0.pxfuel.com/wallpapers/192/1/desktop-wallpaper-rose-splash-rose-flower-love-splash-water.jpg',
        'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_640.jpg',
        'https://c4.wallpaperflare.com/wallpaper/736/96/920/beautiful-unicorn-in-forest-fantasy-computer-desktop-wallpapers-hd-2560%C3%971600-wallpaper-preview.jpg',
        'https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg',
        'https://e0.pxfuel.com/wallpapers/675/1019/desktop-wallpaper-97405-serene-landcapes-background.jpg',
        'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?cs=srgb&dl=pexels-artem-saranin-1187079.jpg&fm=jpg',
        'https://images.pexels.com/photos/1887624/pexels-photo-1887624.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-1887624.jpg&fm=jpg',
        'https://i.pinimg.com/236x/4c/56/14/4c5614387832a1aa00893dd750c80064.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0LFFqggoNdREiNl5tj_2d0TwWQRcVhpt9bQ&usqp=CAU',
        'https://w0.peakpx.com/wallpaper/755/492/HD-wallpaper-flowering-dewdrops-pretty-cool-blade-of-grass-bubbles-unique.jpg',
        'https://t4.ftcdn.net/jpg/05/57/57/63/360_F_557576322_am5DuFwdo7GNMlKh3kCfTvKVxDMaKPNL.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CBkS7_dGnRZvFT6QaEdlcKp1OrB9srTTlLBzytFrmEXJ_Zruwr6lsQvlyX9xOPJpN3o&usqp=CAU',
        'https://c4.wallpaperflare.com/wallpaper/431/451/684/the-most-beautiful-picture-of-nature-wallpaper-preview.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIim_X8iriwbS7Oj60j4zUDqTpCZxuY3iMKDNXY6O5S_CJll5KecFRv8I-OhFS4bWwhWY&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi1GOR5gX-UMuh1TfpD88SKaKSQ0toLcY3YQ&usqp=CAU',
        'https://e0.pxfuel.com/wallpapers/192/1/desktop-wallpaper-rose-splash-rose-flower-love-splash-water.jpg',
        'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_640.jpg',
        'https://c4.wallpaperflare.com/wallpaper/736/96/920/beautiful-unicorn-in-forest-fantasy-computer-desktop-wallpapers-hd-2560%C3%971600-wallpaper-preview.jpg',
        'https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg',
        'https://e0.pxfuel.com/wallpapers/675/1019/desktop-wallpaper-97405-serene-landcapes-background.jpg',
        'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?cs=srgb&dl=pexels-artem-saranin-1187079.jpg&fm=jpg',
        'https://images.pexels.com/photos/1887624/pexels-photo-1887624.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-1887624.jpg&fm=jpg',


    ];

    // const renderItem = ({ item, index }) => (
    //     <TouchableOpacity
    //         style={styles.imageContainer}
    //         onPress={() => togglePreviewModal(index)}
    //     >
    //         <FastImage
    //             source={{ uri: item }}
    //             style={styles.image}
    //             resizeMode={FastImage.resizeMode.cover}
    //         />
    //     </TouchableOpacity>
    // );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header
                title={'Profile Images'}
                leftIcon={images.back}
                // rightIcon={icons.notification}
                leftIconPress={() => {
                    navigation.goBack();
                }}
            // onPressLogo={() => alert('Bell Press')}
            />
            <FlatList
                data={image}
                keyExtractor={(item, index) => index.toString()}
                numColumns={NUM_COLUMNS}
                contentContainerStyle={{ paddingHorizontal: wp(2.5) }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => togglePreviewModal(index)}
                        style={styles.imageContainer}
                    >
                        <Image source={{ uri: `${Config.BASE_URL}${item.imgUrl}` }} style={styles.image} />
                    </TouchableOpacity>
                )}
            />
            <Modal
                visible={previewVisible}
                transparent={true}
                onRequestClose={() => setPreviewVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: `${Config.BASE_URL}${image[selectedImageIndex]?.imgUrl}` }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setPreviewVisible(false)}>
                        {/* Your close button icon */}
                        <Image source={images.cross} style={{ height: '100%', width: '100%', tintColor: 'white' }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton} onPress={() => downloadImage(`${Config.BASE_URL}${image[selectedImageIndex]?.imgUrl}`)}>
                        {/* Your download button */}
                        
                        <Image source={images.download} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* <ImageView
            images={imageArray.map(image => ({ uri: image }))}
            imageIndex={selectedImageIndex}
            visible={previewVisible}
            backgroundColor='rgba(0,0,0,0)'
            onRequestClose={() => setPreviewVisible(false)}
            FooterComponent={() => (
                <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                  <Image source={images.download}  style={{height:'100%' , width:'100%'}} resizeMode='contain'/>
                </TouchableOpacity>
              )}
        />   */}
        </SafeAreaView>
    );
};

export default ProfileImages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    imageContainer: {
        flex: 1,
        margin: 2,
        alignItems: 'flex-start',
    },
    image: {
        // width: Dimensions.get('window').width / NUM_COLUMNS - 6, 
        width: Dimensions.get('window').width / NUM_COLUMNS - 16,
        height: hp(20),
        resizeMode: 'cover',
        borderRadius: wp(2)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
    },
    closeButton: {
        backgroundColor: 'rgba(176, 54, 193,1)',
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
        height: hp(5),
        width: wp(10),
    },
    previewImage: {
        width: Dimensions.get('window').width / 1.1,
        aspectRatio: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    downloadButton: {
        backgroundColor: 'rgba(176, 54, 193,1)',
        padding: 10,
        borderRadius: wp(5),
        position: 'absolute',
        bottom: hp(4),
        alignSelf: 'center',
        height: hp(5),
        width: wp(10),
    },
});


// const styles = StyleSheet.create({
//   imageContainer: {
//       flex: 1,
//       margin: 2,
//       alignItems:'center',
//   },
//   image: {
//       // width: Dimensions.get('window').width / NUM_COLUMNS - 6,
//       width: Dimensions.get('window').width / NUM_COLUMNS - 16,
//       height: hp(20),
//       resizeMode: 'cover',
//       borderRadius:wp(2)
//   },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       paddingHorizontal:8
//     },
//     closeButton: {
//       position: 'absolute',
//       top: 16,
//       right: 16,
//       zIndex: 1,
//     },
//     previewImage: {
//       width: '100%',
//       aspectRatio: 1,
//       borderRadius: 8,
//       backgroundColor: 'white',
//     },
//     downloadButton: {
//         backgroundColor: 'rgba(176, 54, 193,1)',
//         padding: 10,
//         borderRadius: wp(5),
//         position: 'absolute',
//         bottom: hp(4),
//         // right: 20,
//         alignSelf:'center',
//         height:hp(5),
//         width:wp(10),
//       },
//       buttonText: {
//         color: 'white',
//       },
//   });