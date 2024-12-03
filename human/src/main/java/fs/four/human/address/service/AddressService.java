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

    public List<AddressVO> getAllAddress() {
        return addressDAO.getAllAddress();
    }
}
