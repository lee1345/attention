package fs.four.human.address.service;

import fs.four.human.address.dao.AddressDAO;
import fs.four.human.address.vo.AddressVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressDAO addressDAO;

    // 전체 주소록 데이터 조회
    public List<AddressVO> getAllAddress() {
        return addressDAO.getAllAddress();
    }

    // 필터와 검색어 기반 검색
    public List<AddressVO> searchAddress(String category, String query) {
        return addressDAO.searchAddress(category, query);
    }

    // 새로운 주소 데이터 등록
    public AddressVO createAddress(AddressVO address) {
        addressDAO.createAddress(address);
        return address; // 등록된 주소 데이터 반환
    }
//
//    // 주소 데이터 수정
//    public AddressVO updateAddress(String id, AddressVO address) {
//        address.setAdId(id);
//        addressDAO.updateAddress(address);
//        return address;
//    }
//
//    // 주소 데이터 삭제
//    public void deleteAddress(String id) {
//        addressDAO.deleteAddress(id);
//    }

}
