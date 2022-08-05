export default props => {
  const { state, progress, navigation } = props;
  const { index, routes } = state;

  const opacity = interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.1, 1],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <Animated.View style={[
      styles.container, {
        opacity: opacity
      }]}>

      <SafeAreaView style={styles.imageContainer} edges={['top']}>
        <ImageBackground
          source={require('./assets/images/2.jpg')}
          style={styles.drawerImage}
          imageStyle={styles.imageStyle}
          resizeMode='cover'
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
        </ImageBackground>
      </SafeAreaView>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainerStyle}>
    
            <DrawerItem
              key={route.key}
              label={({ focused }) => {
                return (
                  <Text>
                 
                  </Text>
                )
              }}
              onPress={() => navigation.navigate(`${route.name}`)}
              activeBackgroundColor='transparent'
            />
          
     
      </DrawerContentScrollView>
    </Animated.View>
  )
};
