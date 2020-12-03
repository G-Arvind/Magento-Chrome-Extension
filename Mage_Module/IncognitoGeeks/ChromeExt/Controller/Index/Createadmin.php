<?php
/**
 * Create Magento Admin user
 *
 */
declare(strict_types=1);

namespace IncognitoGeeks\ChromeExt\Controller\Index;

use Exception;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\Cache\Manager;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Forward;
use Magento\Framework\Controller\Result\ForwardFactory;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\View\Result\PageFactory;
use Magento\User\Model\ResourceModel\User;
use Magento\User\Model\UserFactory;

class Createadmin implements HttpGetActionInterface
{
    /**
     * @var PageFactory
     */
    private $_pageFactory;

    /**
     * @var JsonFactory
     */
    private $resultJsonFactory;

    /**
     * @var Manager
     */
    private $cacheManager;

    /**
     * @var ForwardFactory
     */
    private $forwardFactory;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var UserFactory
     */
    private $userFactory;

    /**
     * @var User
     */
    private $userResource;

    /**
     * Cacheclean constructor.
     * @param PageFactory $pageFactory
     * @param JsonFactory $resultJsonFactory
     * @param Manager $cacheManager
     * @param ForwardFactory $forwardFactory
     * @param RequestInterface $request
     * @param UserFactory $userFactory
     * @param User $userResource
     */
    public function __construct(
        PageFactory $pageFactory,
        JsonFactory $resultJsonFactory,
        Manager $cacheManager,
        ForwardFactory $forwardFactory,
        RequestInterface $request,
        UserFactory $userFactory,
        User $userResource
    ) {
        $this->_pageFactory = $pageFactory;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->cacheManager = $cacheManager;
        $this->forwardFactory = $forwardFactory;
        $this->request = $request;
        $this->userFactory = $userFactory;
        $this->userResource = $userResource;
    }

    /**
     * @return Forward|Json
     */
    public function execute()
    {
        $result = $this->resultJsonFactory->create();

        if (true) {
            $adminInfo = [
                'username'  => $this->request->getParam('userName'),
                'firstname' => $this->request->getParam('firstName'),
                'lastname'  => $this->request->getParam('lastName'),
                'email'     => $this->request->getParam('email'),
                'password'  => $this->request->getParam('password'),
                'interface_locale' => 'en_US',
                'is_active' => 1
            ];

            $userModel = $this->userFactory->create();
            $userModel->setData($adminInfo);
            $userModel->setRoleId(1);

            try {
                $this->userResource->save($userModel);
                $response [] =
                    [
                        'code' => "200",
                        'message' => 'success'
                    ];
            } catch (Exception $e) {
                $response [] =
                    [
                        'code' => "500",
                        'message' => 'error' . $e->getMessage()
                    ];
            }
            return $result->setData($response);
        } else {
            //redirect
            $forward = $this->forwardFactory->create();
            return $forward->forward('defaultNoRoute');
        }
    }
}
