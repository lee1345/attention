package fs.four.human.address.service;

import fs.four.human.address.dao.AddressDAO;
import fs.four.human.address.vo.AddressVO;
import fs.four.human.freeBoard.vo.FreeBoardVO;
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

    // 특정 공지사항 조회
    public AddressVO getAddressById(int id) {
        return addressDAO.getAddressById(id);
    }

    // 새로운 주소 데이터 등록
    public void createAddress(AddressVO address) {
        addressDAO.createAddress(address);
    }
}
