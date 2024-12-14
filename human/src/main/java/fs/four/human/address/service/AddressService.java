package fs.four.human.address.service;

import fs.four.human.address.dao.AddressDAO;
import fs.four.human.address.vo.AddressVO;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AddressService {

    @Autowired
    private AddressDAO addressDAO;

    // 로그인 사용자의 주소록 데이터 조회
    public List<AddressVO> getAddressByEmployeeId(String employeeId) {
        return addressDAO.getAddressByEmployeeId(employeeId);
    }

    // 로그인 사용자의 검색 데이터 조회
    public List<AddressVO> searchAddressByEmployeeId(String employeeId, String category, String query) {
        return addressDAO.searchAddressByEmployeeId(employeeId, category, query);
    }

    // 특정 주소 조회
    public AddressVO getAddressById(int id) {
        return addressDAO.getAddressById(id);
    }

    // 새로운 주소 데이터 등록
    public void createAddress(AddressVO address) {
        addressDAO.createAddress(address);
    }

    // 주소 수정
    public void updateAddress(AddressVO address) {
        addressDAO.updateAddress(address);
    }

    // 주소 삭제
    public void deleteAddress(int id) {
        addressDAO.deleteAddress(id);
    }

    // 제목클릭 정렬
    public List<AddressVO> sortAddress(String employeeId, String column, String order) {
        // 입력된 column과 order를 검증
        if (!isValidColumn(column) || !isValidOrder(order)) {
            throw new IllegalArgumentException("잘못된 정렬 요청입니다.");
        }

        // Map에 파라미터를 담아서 전달
        Map<String, String> params = new HashMap<>();
        params.put("employeeId", employeeId);
        params.put("column", column);
        params.put("order", order);

        // DAO 호출
        return addressDAO.sortAddress(params);
    }
    private boolean isValidColumn(String column) {
        List<String> validColumns = Arrays.asList("AD_NAME", "AD_PHONE", "AD_EMAIL", "AD_DEPT_NAME", "AD_GROUP");
        return validColumns.contains(column);
    }

    private boolean isValidOrder(String order) {
        return "ASC".equalsIgnoreCase(order) || "DESC".equalsIgnoreCase(order);
    }



}
