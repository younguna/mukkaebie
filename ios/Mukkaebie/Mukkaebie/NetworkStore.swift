//
//  NetworkUser.swift
//  Mukkaebie
//
//  Created by woowabrothers on 2017. 8. 10..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation
import Alamofire


class NetworkStore {
    
    private let url = URLpath.getURL()
    
    func getStoreList() {
        Alamofire.request("\(url)stores").responseJSON { (response) in
            if let response = response.result.value as? [[String:Any]] {
                var storeList = [ModelStores]()
                for item in response {
                    let store = ModelStores(JSON: item)
                    storeList.append(store!)
                }

                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "getStoreList"), object: nil, userInfo: ["storeList":storeList])
            }
        }
    }
    
    func getStoreList(sellerId: Int) {
        let encodedString = ("\(url)stores/\(sellerId)").addingPercentEncoding(withAllowedCharacters: CharacterSet.urlFragmentAllowed)
        
        Alamofire.request(URL(string: encodedString!)!).responseJSON { (response) in
            if let response = response.result.value as? [[String:Any]] {
                var storeList = [ModelStores]()
                for item in response {
                    let store = ModelStores(JSON: item)
                    storeList.append(store!)
                }
                
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "getStore"), object: nil, userInfo: ["storeList":storeList])
            } else {
                print(response.result)
            }
        }
    }
    
    func getStoreList(category: String) {
        let encodedString = ("\(url)stores/bycategory/"+category).addingPercentEncoding(withAllowedCharacters: CharacterSet.urlFragmentAllowed)
        
        Alamofire.request(URL(string: encodedString!)!).responseJSON { (response) in
            if let response = response.result.value as? [[String:Any]] {
                var storeList = [ModelStores]()
                for item in response {
                    let store = ModelStores(JSON: item)
                    storeList.append(store!)
                }
                
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "getStoreList"), object: nil, userInfo: ["storeList":storeList])
            } else {
                print(response.result)
            }
        }
    }
}
