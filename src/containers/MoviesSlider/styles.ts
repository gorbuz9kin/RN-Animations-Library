import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  ratingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  rating: {
    fontWeight: '500',
  },
  genresWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  genre: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderColor: '#000',
    color: '#000',
    borderWidth: 1,
    fontSize: 12,
    opacity: 0.6,
  },
  description: {
    fontSize: 16,
  },
});

export default styles;
