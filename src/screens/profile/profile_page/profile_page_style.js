const styles = {
  safearea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: '#473B3B',
    fontSize: 20,
    fontFamily: 'Pretendard',
    fontWeight: '800',
    lineHeight: 30,
    textAlign: "center",
  },
  profileCard: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#ffffff",
    
  },
  profileImage: {
    width: 70,
    height: 70,
    backgroundColor: "#ddd",
    borderRadius: 50,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Pretendard",
    lineHeight: 24, // 
  },
  profileId: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Pretendard",
    lineHeight: 20, // 
  },
  arrow: {
    fontSize: 20,
    color: "#999",
  },
  divider: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
    marginBottom: 25,
  },
  menuList: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10,
  },
  menuItem: {
    fontSize: 16,
    color: "#646464",
    marginBottom: 28,
    paddingLeft: 10,
    fontFamily: "Pretendard",
    lineHeight: 25, 
  },
  bottomNav: {
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabelActive: {
    color: '#473B3B',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 20, 
  },
  navLabel: {
    color: '#CCD0D7',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 20, 
  },
};

export default styles;
