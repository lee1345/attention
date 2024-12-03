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
        List<AddressVO> addresses = addressDAO.getAllAddress();
        return addresses;
    }

    // 필터와 검색어 기반 검색
    public List<AddressVO> searchAddress(String category, String query) {
        return addressDAO.searchAddress(category, query);
    }

}
